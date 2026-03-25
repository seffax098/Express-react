const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const { generateRefreshToken, generateAccessToken } = require('../utils/generateTokens')
const users = require("../data/users");
const { hashPassword, verifyPassword } = require("../utils/password");
const { REFRESH_SECRET } = require("../config/auth");
const refreshTokens = new Set()

const register = async (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const errors = {};

    if (!email) {
        errors.email = "email is required";
    }
    if (!first_name) {
        errors.first_name = "first_name is required";
    }
    if (!last_name) {
        errors.last_name = "last_name is required";
    }
    if (!password) {
        errors.password = "password is required";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            error: "Validation error",
            details: errors,
        });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return res.status(409).json({
            error: "Conflict",
            details: {
                email: "user with this email already exists",
            },
        });
    }

    const newUser = {
        id: nanoid(6),
        email,
        first_name,
        last_name,
        password: await hashPassword(password),
    };

    users.push(newUser);

    return res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
        errors.email = "email is required";
    }
    if (!password) {
        errors.password = "password is required";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            error: "Validation error",
            details: errors,
        });
    }

    const user = users.find((item) => item.email === email);
    if (!user) {
        return res.status(404).json({
            error: "User not found",
            details: {
                email: "user with this email does not exist",
            },
        });
    }

    const isAuth = await verifyPassword(password, user.password);

    if (!isAuth) {
        return res.status(400).json({
            error: "Invalid credentials",
            details: {
                password: "password is incorrect",
            },
        });
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    refreshTokens.add(refreshToken)

    return res.status(200).json({
        accessToken,
        refreshToken
    });
};

const me = (req, res) => {
    const userId = req.user.sub;

    const user = users.find((user) => user.id === userId);

    if (!user) {
        return res.status(404).json({
            error: "User not found",
        });
    }

    res.json({
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
    });
};

const refresh = (req, res) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        res.status(400).json({
            error: 'refreshToken is required'
        })
    }

    if (!refreshTokens.has(refreshToken)) {
        res.status(401).json({
            error: 'Invalid refreshTokken'
        })
    }

    try {
        const payload = jwt.verify(refreshToken, REFRESH_SECRET)
        const user = users.find(user => user.id === payload.sub)
        if (!user) {
            res.status(401),json({
                error: 'User not found'
            })
        }

        refreshTokens.delete(refreshToken)

        const newRefreshToken = generateRefreshToken(user)
        const newAccessToken = generateAccessToken(user)

        refreshTokens.add(newRefreshToken)

        res.status(200).json({
            refreshToken: newRefreshToken,
            accessToken: newAccessToken
        })
    } catch (err) {
        res.status(401).json({
            error: 'Invalid or expired refresh token'
        })
    }
}

module.exports = {
    register,
    login,
    me,
    refresh,
};
