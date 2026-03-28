import { useEffect, useState } from 'react';
import styles from './Account.module.scss'
import Navbar from 'components/Navbar';
import { getMe, login, logout, registration } from 'api/auth';

const getErrorMessage = (err, fallback) => {
    const details = err.response?.data?.details;

    if (details && typeof details === 'object') {
        const firstMessage = Object.values(details)[0];
        if (typeof firstMessage === 'string') {
            return firstMessage;
        }
    }

    return err.response?.data?.error || fallback;
};

const Account = () => {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const currentUser = await getMe()
                setUser(currentUser)
            } catch (err) {
                logout()
            } finally {
                setIsCheckingAuth(false)
            }
        }

        checkAuth()
    }, [])

    const clearForm = () => {
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setIsSubmitting(true)

            await registration({ email, firstName, lastName, password })
            await login({ email, password })
            const currentUser = await getMe()
            setUser(currentUser)
            clearForm()
        } catch (err) {
            setError(getErrorMessage(err, 'Registration failed'))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setIsSubmitting(true)

            await login({ email, password })
            const currentUser = await getMe()
            setUser(currentUser)
            clearForm()
        } catch (err) {
            setError(getErrorMessage(err, 'Login failed'))
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleToggleMode = (nextIsLogin) => {
        setError('')
        setIsLogin(nextIsLogin)
    }

    const handleLogout = () => {
        logout()
        setUser(null)
        setError('')
        clearForm()
    }

    return (
        <div className="app-page">
            <Navbar />
            <main className="app-main">
                <div className="app-container">
                    <div className={styles.account}>
                        {isCheckingAuth ? (
                            <div className={styles.status}>Checking session...</div>
                        ) : user ? (
                            <div className={styles.profileCard}>
                                <h2>Account</h2>
                                <div className={styles.profileRow}>
                                    <span>Email</span>
                                    <strong>{user.email}</strong>
                                </div>
                                <div className={styles.profileRow}>
                                    <span>First name</span>
                                    <strong>{user.first_name}</strong>
                                </div>
                                <div className={styles.profileRow}>
                                    <span>Last name</span>
                                    <strong>{user.last_name}</strong>
                                </div>
                                <button type="button" className={styles.formButton} onClick={handleLogout}>
                                    <span className={styles.formButtonText}>Logout</span>
                                </button>
                            </div>
                        ) : !isLogin ? (
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
                                {error && <p className={styles.error}>{error}</p>}
                                <button type="submit" className={styles.formButton} disabled={isSubmitting}>
                                    <span className={styles.formButtonText}>
                                        {isSubmitting ? 'Loading...' : 'Register'}
                                    </span>
                                </button>
                                <span onClick={() => handleToggleMode(true)} className={styles.setIsLogin}>Уже есть аккаунт?</span>
                            </form>
                        ) : (
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
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Account;
