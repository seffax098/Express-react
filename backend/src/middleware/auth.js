const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/auth");

module.exports = (req, res, next) => {
    const header = req.get("Authorization") || "";
    const [schema, token] = header.split(" ");

    if (schema !== "Bearer" || !token) {
        return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
