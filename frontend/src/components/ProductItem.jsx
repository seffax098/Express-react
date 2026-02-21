import React from "react";

export default function ProductItem({ product, onEdit, onDelete }) {
    return (
        <div className="productItem">
            <div className="productMain">

                <div className="productName">
                    <b>{product.title}</b>
                </div>

                <div className="productPrice">
                    Цена: {product.price} ₽
                </div>

                <div className="productCatedory">
                    Категория: {product.category}
                </div>

                <div className="productDescription">
                    {product.description}
                </div>

                <div className="productStock">
                    На складе: {product.stock} шт.
                </div>

            </div>

            <div className="productActions">
                <button className="btn" onClick={() => onEdit(product)}>
                    Редактировать
                </button>

                <button
                    className="btn btn--danger"
                    onClick={() => onDelete(product.id)}
                >
                    Удалить
                </button>
            </div>
        </div>
    );
}