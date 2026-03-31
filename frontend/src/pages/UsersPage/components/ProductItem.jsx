import React from "react";
import { Link } from 'react-router-dom'

export default function ProductItem({ product, onEdit, onDelete, role }) {
    return (
        <div className="productItem">
            <div className="productMain">

                <Link to={`/product/${product.id}`}>
                    <div className="productName">
                        <b className="productTitle">{product.title}</b>
                    </div>
                </Link>

                <div className="productPrice">
                    Цена: {product.price} ₽
                </div>

                <div className="productCategory">
                    Категория: {product.category}
                </div>

                <div className="productDescription">
                    {product.description}
                </div>

                <div className="productStock">
                    На складе: {product.stock} шт.
                </div>

            </div>

            {(role === 'seller' || role === 'admin') && <div className="productActions">
                <button className="btn" onClick={() => onEdit(product)}>
                    Редактировать
                </button>

                <button
                    className="btn btn--danger"
                    onClick={() => onDelete(product.id)}
                >
                    Удалить
                </button>
            </div>}
        </div >
    );
}