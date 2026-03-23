const validateProductFields = ({ title, category, description, price, stock }, { partial = false } = {}) => {
    const errors = {};

    if (!partial || title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
            errors.title = "title is required";
        }
    }

    if (!partial || category !== undefined) {
        if (typeof category !== "string" || !category.trim()) {
            errors.category = "category is required";
        }
    }

    if (!partial || description !== undefined) {
        if (typeof description !== "string" || !description.trim()) {
            errors.description = "description is required";
        }
    }

    if (!partial || price !== undefined) {
        const priceNum = Number(price);
        if (!Number.isFinite(priceNum)) {
            errors.price = "price must be a valid number";
        } else if (priceNum < 0) {
            errors.price = "price must be >= 0";
        }
    }

    if (!partial || stock !== undefined) {
        const stockNum = Number(stock);
        if (!Number.isFinite(stockNum) || !Number.isInteger(stockNum)) {
            errors.stock = "stock must be an integer";
        } else if (stockNum < 0) {
            errors.stock = "stock must be >= 0";
        }
    }

    return errors;
};

module.exports = {
    validateProductFields,
};
