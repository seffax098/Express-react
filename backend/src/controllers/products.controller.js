const { nanoid } = require("nanoid");

const products = require("../data/products");
const { validateProductFields } = require("../utils/validators");

const findProductById = (id) => {
    return products.find((product) => product.id === id);
};

const createProduct = (req, res) => {
    const { title, price, description, category, stock } = req.body;
    const errors = validateProductFields({ title, price, description, category, stock });

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: "Validation error", details: errors });
    }

    const newProduct = {
        id: nanoid(6),
        title: title.trim(),
        price: Number(price),
        description: description.trim(),
        category: category.trim(),
        stock: Number(stock),
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
};

const getProducts = (req, res) => {
    return res.json(products);
};

const getProductById = (req, res) => {
    const product = findProductById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    return res.json(product);
};

const updateProduct = (req, res) => {
    const product = findProductById(req.params.id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    if (req.body?.title === undefined
        && req.body?.price === undefined
        && req.body?.description === undefined
        && req.body?.stock === undefined
        && req.body?.category === undefined) {
        return res.status(400).json({ error: "Nothing to update" });
    }

    const { title, price, description, stock, category } = req.body;
    const errors = validateProductFields({ title, price, description, category, stock }, { partial: true });

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: "Validation error", details: errors });
    }

    if (title !== undefined) product.title = title.trim();
    if (price !== undefined) product.price = Number(price);
    if (description !== undefined) product.description = description.trim();
    if (category !== undefined) product.category = category.trim();
    if (stock !== undefined) product.stock = Number(stock);

    return res.json(product);
};

const deleteProduct = (req, res) => {
    const index = products.findIndex((product) => product.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    products.splice(index, 1);
    return res.status(204).send();
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
