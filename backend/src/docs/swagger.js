const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express React Demo API",
            version: "1.0.0",
            description: "API for authentication, products, and admin user management.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
        ],
        tags: [
            {
                name: "Auth",
                description: "Authentication and session endpoints",
            },
            {
                name: "Products",
                description: "Product catalog management",
            },
            {
                name: "Users",
                description: "Admin-only user management",
            },
        ],
    },
    apis: ["./src/routes/*.js", "./src/docs/*.js"],
};

module.exports = swaggerJsdoc(swaggerOptions);
