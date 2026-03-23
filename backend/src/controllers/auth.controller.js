const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");

const { jwtSecret, accessExpiresIn } = require("../config/auth");
const users = require("../data/users");
const { hashPassword, verifyPassword } = require("../utils/password");

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

    const accessToken = jwt.sign(
        {
            sub: user.id,
            username: user.email
        },
        jwtSecret,
        {
            expiresIn: accessExpiresIn
        }
    )

    return res.status(200).json({
        accessToken,
        tokenType: "Bearer",
        expiresIn: accessExpiresIn,
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

module.exports = {
    register,
    login,
    me,
};
