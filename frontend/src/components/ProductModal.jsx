import React, { useEffect, useState } from "react";

export default function ProductModal({ open, mode, initialUser, onClose, onSubmit }) {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (!open) return;

        setTitle(initialUser?.title ?? "");
        setPrice(initialUser?.price ?? "");
        setCategory(initialUser?.category ?? "");
        setDescription(initialUser?.description ?? "");
        setStock(initialUser?.stock ?? "");
    }, [open, initialUser]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            id: initialUser?.id,
            title,
            price: Number(price),
            category,
            description,
            stock: Number(stock)
        });
    };

    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">
                        {mode === "edit" ? "Редактирование товара" : "Создание товара"}
                    </div>
                    <button className="iconBtn" onClick={onClose}>✕</button>
                </div>

                <form className="form" onSubmit={handleSubmit}>

                    <label className="label">
                        Название
                        <input className="input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Цена
                        <input className="input"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Категория
                        <input className="input"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Количество
                        <input className="input"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Описание
                        <textarea className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <div className="modal__footer">
                        <button type="button" className="btn" onClick={onClose}>
                            Отмена
                        </button>
                        <button type="submit" className="btn btn--primary">
                            Сохранить
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}