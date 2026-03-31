import styles from '../../Account.module.scss'

const Login = ({
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isSubmitting,
    handleToggleMode,
}) => {
    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <h2>Log in</h2>
            <div className={styles.form_input}>
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={styles.form_input}>
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.formButton} disabled={isSubmitting}>
                <span className={styles.formButtonText}>
                    {isSubmitting ? 'Loading...' : 'Login'}
                </span>
            </button>
            <span onClick={() => handleToggleMode(false)} className={styles.setIsLogin}>Еще нет аккаунта?</span>
        </form>
    )
}

export default Login
