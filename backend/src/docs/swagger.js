const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API управления товарами",
            version: "1.0.0",
            description: "Простое API для управления товарами",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Локальный сервер",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/docs/*.js"],
};

module.exports = swaggerJsdoc(swaggerOptions);
