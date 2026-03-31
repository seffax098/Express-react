import styles from '../../Account.module.scss'

const Register = ({
    handleRegister,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    role,
    setRole,
    error,
    isSubmitting,
    handleToggleMode,
}) => {
    return (
        <form className={styles.form} onSubmit={handleRegister}>
            <h2>Register</h2>
            <div className={styles.form_input}>
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.form_input}>
                <span>First Name</span>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className={styles.form_input}>
                <span>Last Name</span>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className={styles.form_input}>
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.form_input}>
                <span>Role</span>
                <div className={styles.roleButtons}>
                    <button type="button" onClick={() => setRole('user')} className={role === 'user' ? styles.active : ''}>User</button>
                    <button type="button" onClick={() => setRole('seller')} className={role === 'seller' ? styles.active : ''}>Seller</button>
                    <button type="button" onClick={() => setRole('admin')} className={role === 'admin' ? styles.active : ''}>Admin</button>
                </div>
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.formButton} disabled={isSubmitting}>
                <span className={styles.formButtonText}>
                    {isSubmitting ? 'Loading...' : 'Register'}
                </span>
            </button>
            <span onClick={() => handleToggleMode(true)} className={styles.setIsLogin}>Уже есть аккаунт?</span>
        </form>
    )
}

export default Register
