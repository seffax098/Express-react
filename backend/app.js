const express = require('express');
const cors = require("cors");
const { nanoid } = require('nanoid');
const app = express();
const port = 3000;


app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

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
// Функция-помощник для получения товара из списка
function findProductOr404(id, res) {
    const product = products.find(u => u.id == id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return null;
    }
    return product;
}
// Функция-помощник
// POST /api/products
app.post("/api/products", (req, res) => {
    const { title, price, description, category, stock } = req.body;
    const newProduct = {
        id: nanoid(6),
        title: title?.trim(),
        price: Number(price),
        description: description?.trim(),
        category: category?.trim(),
        stock: Number(stock)
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
// GET /api/products
app.get("/api/products", (req, res) => {
    res.json(products);
});
// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const product = findProductOr404(id, res);
    if (!product) return;
    res.json(product);
});
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