const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const authConfig = require('../config/auth')

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            username: user.username,
            role: user.role,
            jti: nanoid()
        },
        authConfig.ACCESS_SECRET,
        {
            expiresIn: authConfig.ACCESS_EXPIRES_IN
        }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            sub: user.id,
            username: user.username,
            role: user.role,
            jti: nanoid()
        },
        authConfig.REFRESH_SECRET,
        {
            expiresIn: authConfig.REFRESH_EXPIRES_IN
        }
    )
}

module.exports = { generateRefreshToken, generateAccessToken }
