import React, { useEffect, useState } from "react";
import "./ProductsPage.scss";
import ProductsList from "./components/ProductsList";
import ProductModal from "./components/ProductModal";
import { api } from "api";
import Navbar from "components/Navbar";
import { getMe } from "api/auth";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [editingProduct, setEditingProduct] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getMe();
                setUser(currentUser);
            } catch (err) {
                console.log(err);
                setUser(null);
            }
        };

        loadUser();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);

                if (!user) {
                    setProducts([]);
                    return;
                }

                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                alert("Ошибка загрузки товаров");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [user]);

    const openCreate = () => {
        setModalMode("create");
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEdit = (product) => {
        if (!user) {
            alert('Нужно авторизироваться');
            return;
        }
        setModalMode("edit");
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        if (!user) {
            alert('Нужно авторизироваться');
            return;
        }
        const ok = window.confirm("Удалить товар?");
        if (!ok) return;

        try {
            await api.deleteProduct(id);
            setProducts((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error(err);
            alert(err);
        }
    };

    const handleSubmitModal = async (payload) => {
        try {
            if (modalMode === "create") {
                const newProduct = await api.createProduct(payload);
                setProducts((prev) => [...prev, newProduct]);
            } else {
                const updatedProduct = await api.updateProduct(payload.id, payload);
                setProducts((prev) =>
                    prev.map((u) => (u.id === payload.id ? updatedProduct : u))
                );
            }

            closeModal();
        } catch (err) {
            console.error(err);
            alert("Ошибка сохранения товара");
        }
    };

    return (
        <div className="app-page">
            <Navbar />
            <main className="app-main">
                {!user ? (
                    <div className="notAuth"><p>Нужно авторизироваться!</p></div>
                ) : (<div className="app-container">
                    <div className="toolbar">
                        <h1 className="title">Товары</h1>
                        {(user?.role === 'seller' || user?.role === 'admin') && <button className="btn btn--primary" onClick={openCreate}>
                            + Создать товар
                        </button>}
                    </div>

                    {loading ? (
                        <div className="empty">Загрузка...</div>
                    ) : (
                        <ProductsList
                            products={products}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                            role={user?.role}
                        />
                    )}
                </div>)}
            </main>

            <footer className="app-footer">
                <div className="app-footer__inner">
                    © {new Date().getFullYear()} Интернет-магазин
                </div>
            </footer>

            <ProductModal
                open={modalOpen}
                mode={modalMode}
                initialProduct={editingProduct}
                onClose={closeModal}
                onSubmit={handleSubmitModal}
            />
        </div>
    );
}
