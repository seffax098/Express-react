const { nanoid } = require("nanoid");

const products = [
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

module.exports = products;
