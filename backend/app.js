const express = require('express');
const cors = require("cors");
const { nanoid } = require('nanoid');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;


app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`[${new Date().toISOString()}] [${req.method}]
${res.statusCode} ${req.path}`);
        if (req.method === 'POST' || req.method === 'PUT' || req.method ===
            'PATCH') {
            console.log('Body:', req.body);
        }
    });
    next();
});

let products = [
    { id: nanoid(6), title: "Игровая мышь", category: "Периферия", description: "RGB, 12000 DPI", price: 3500, stock: 5 },
    { id: nanoid(6), title: "Механическая клавиатура", category: "Периферия", description: "Blue Switch", price: 6500, stock: 3 },
    { id: nanoid(6), title: "Монитор 24", category: "Мониторы", description: "144Hz IPS", price: 18000, stock: 2 },
    { id: nanoid(6), title: "SSD 1TB", category: "Комплектующие", description: "NVMe", price: 9000, stock: 7 },
    { id: nanoid(6), title: "Видеокарта RTX 3060", category: "Комплектующие", description: "12GB GDDR6", price: 42000, stock: 1 },
    { id: nanoid(6), title: "Наушники", category: "Аудио", description: "7.1 Surround", price: 4000, stock: 6 },
    { id: nanoid(6), title: "Коврик XL", category: "Периферия", description: "900x400", price: 1200, stock: 10 },
    { id: nanoid(6), title: "Web-камера", category: "Аксессуары", description: "1080p", price: 2800, stock: 4 },
    { id: nanoid(6), title: "Микрофон", category: "Аудио", description: "Конденсаторный", price: 5200, stock: 2 },
    { id: nanoid(6), title: "USB-хаб", category: "Аксессуары", description: "4 порта USB 3.0", price: 1500, stock: 8 }
];


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API управления товарами',
            version: '1.0.0',
            description: 'Простое API для управления товарами',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Локальный сервер',
            },
        ],
    },
    apis: ['./app.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - description
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: string
 *           description: Автоматически сгенерированный уникальный ID товара
 *         title:
 *           type: string
 *           description: Название товара
 *         category:
 *           type: string
 *           description: Категория товара
 *         description:
 *           type: string
 *           description: Описание товара
 *         price:
 *           type: number
 *           description: Цена товара
 *         stock:
 *           type: integer
 *           description: Количество товара
 *       example:
 *         id: "abc123"
 *         title: "Микрофон"
 *         category: "Аудио"
 *         description: "Конденсаторный"
 *         price: 5200
 *         stock: 8
 */


// Функция-помощник для получения товара из списка
function findProductOr404(id, res) {
    const product = products.find(u => u.id == id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return null;
    }
    return product;
}


/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Создает новый товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - category
 *               - description
 *               - price
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Некорректные данные запроса
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: object
 *                   additionalProperties:
 *                     type: string
 */

// POST /api/products
app.post("/api/products", (req, res) => {
    const { title, price, description, category, stock } = req.body;

    // простая валидация (400), чтобы не создавать "битые" товары
    const errors = {};

    if (typeof title !== "string" || !title.trim()) {
        errors.title = "title is required";
    }
    if (typeof category !== "string" || !category.trim()) {
        errors.category = "category is required";
    }
    if (typeof description !== "string" || !description.trim()) {
        errors.description = "description is required";
    }

    const priceNum = Number(price);
    if (!Number.isFinite(priceNum)) {
        errors.price = "price must be a valid number";
    } else if (priceNum < 0) {
        errors.price = "price must be >= 0";
    }

    const stockNum = Number(stock);
    if (!Number.isFinite(stockNum) || !Number.isInteger(stockNum)) {
        errors.stock = "stock must be an integer";
    } else if (stockNum < 0) {
        errors.stock = "stock must be >= 0";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: "Validation error", details: errors });
    }

    const newProduct = {
        id: nanoid(6),
        title: title.trim(),
        price: priceNum,
        description: description.trim(),
        category: category.trim(),
        stock: stockNum
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Возвращает список всех товаров
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Список товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

// GET /api/products
app.get("/api/products", (req, res) => {
    res.json(products);
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Получает товар по ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Данные товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */

// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = findProductOr404(id, res);
    if (!product) return;
    res.json(product);
});


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Обновляет данные товара
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Обновленный товар
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Нет данных для обновления
 *       404:
 *         description: Товар не найден
 */
// PATCH /api/products/:id
app.patch("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = findProductOr404(id, res);
    if (!product) return;
    // Нельзя PATCH без полей
    if (req.body?.title === undefined && req.body?.price === undefined && req.body?.description === undefined
        && req.body?.stock === undefined && req.body?.category === undefined
    ) {
        return res.status(400).json({
            error: "Nothing to update",
        });
    }
    const { title, price, description, stock, category } = req.body;
    if (title !== undefined) product.title = title.trim();
    if (price !== undefined) product.price = Number(price);
    if (description !== undefined) product.description = description.trim();
    if (category !== undefined) product.category = category.trim();
    if (stock !== undefined) product.stock = Number(stock);

    res.json(product);
});


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Удаляет товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID товара
 *     responses:
 *       204:
 *         description: Товар успешно удален (нет тела ответа)
 *       404:
 *         description: Товар не найден
 */

// DELETE /api/products/:id
app.delete("/api/products/:id", (req, res) => {
    const id = req.params.id;

    const exists = products.some((u) => u.id === id);
    if (!exists) return res.status(404).json({ error: "Product not found" });
    products = products.filter((u) => u.id !== id);
    // Правильнее 204 без тела
    res.status(204).send();
});
// 404 для всех остальных маршрутов
app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});
// Глобальный обработчик ошибок (чтобы сервер не падал)
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});