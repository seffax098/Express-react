const authConfig = {
    jwtSecret: process.env.JWT_SECRET || "access_secret",
    accessExpiresIn: process.env.ACCESS_EXPIRES_IN || "15m",
};

module.exports = authConfig;
