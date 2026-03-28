import { api } from "api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "components/Navbar";
import { getMe } from "api/auth";
import styles from './ProductPage.module.scss'

const ProductPage = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState("");
    const { id } = useParams();
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await getMe()
                setUser(user)
            } catch (err) {
                console.log(err)
                setUser(null)
            }
        }
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await api.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.log(err);
                setProduct(null);
                setError("Не удалось загрузить товар");
            } finally {
                setLoading(false);
            }
        };

        loadUser()
        loadProduct();
    }, [id]);

    return (
        <div className="app-page">
            <Navbar />
            <main className="app-main">
                <div className="app-container">
                    {loading ? (
                        <div className="empty">Загрузка...</div>
                    ) : !user ? (
                        <div className={styles.authErr}>Нужно авторизироваться</div>
                    ) : error ? (
                        <div className="empty">{error}</div>
                    ) : !product ? (
                        <div className="empty">Товар не найден</div>
                    ) : (
                        <div className="productItem">
                            <div className="productMain">
                                <div className="productName">
                                    <b className="productTitle">{product.title}</b>
                                </div>

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
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
