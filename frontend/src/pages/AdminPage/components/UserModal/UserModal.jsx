import React, { useEffect, useState } from "react";
import styles from './UserModal.module.scss'

export default function UserModal({ open, mode, initialUser, onClose, onSubmit }) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (!open) return;

        setEmail(initialUser?.email ?? "");
        setFirstName(initialUser?.first_name ?? "");
        setLastName(initialUser?.last_name ?? "");
        setRole(initialUser?.role ?? "");
        setPassword(initialUser?.password ?? "");
    }, [open, initialUser]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            id: initialUser?.id,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            role,
        });
    };

    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">
                        {mode === "edit" ? "Редактирование пользователя" : "Создание пользователя"}
                    </div>
                    <button className="iconBtn" onClick={onClose}>✕</button>
                </div>

                <form className="form" onSubmit={handleSubmit}>

                    <label className="label">
                        Email
                        <input className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        First name
                        <input className="input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Last name
                        <input className="input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                    <label className="label">
                        Role
                        <div className={styles.roleButtons}>
                            <button type="button" onClick={() => setRole('user')} className={role === 'user' ? styles.active : styles.notactive}>User</button>
                            <button type="button" onClick={() => setRole('seller')} className={role === 'seller' ? styles.active : styles.notactive}>Seller</button>
                            <button type="button" onClick={() => setRole('admin')} className={role === 'admin' ? styles.active : styles.notactive}>Admin</button>
                        </div>
                    </label>

                    <label className="label">
                        Password
                        <input className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
