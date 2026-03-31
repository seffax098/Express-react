module.exports = (allowedRole) => {
    return (req, res, next) => {
        if (!req.user || !allowedRole.includes(req.user.role)) {
            return res.status(403).json({
                error: "Forbidden",
            })
        }
        next()
    }
}