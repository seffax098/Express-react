const sanitizeBodyForLogs = (req) => {
    if (!req.body || typeof req.body !== "object") {
        return req.body;
    }

    if (req.path === "/register" || req.path === "/login") {
        return {
            ...req.body,
            password: req.body.password ? "***" : req.body.password,
        };
    }

    return req.body;
};

module.exports = (req, res, next) => {
    res.on("finish", () => {
        console.log(`[${new Date().toISOString()}] [${req.method}]\n${res.statusCode} ${req.originalUrl}`);

        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
            console.log("Body:", sanitizeBodyForLogs(req));
        }
    });

    next();
};
