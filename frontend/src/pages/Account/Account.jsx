import { useEffect, useState } from 'react';
import styles from './Account.module.scss'
import Navbar from 'components/Navbar';
import { getMe, login, logout, registration } from 'api/auth';
import Register from './components/Register';
import Login from './components/Login';
import User from './components/User';

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
    const [role, setRole] = useState('user')
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
        setRole('user')
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setIsSubmitting(true)

            await registration({ email, firstName, lastName, password, role })
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
                            <User user={user} handleLogout={handleLogout} />
                        ) : !isLogin ? (
                            <Register
                                handleRegister={handleRegister}
                                email={email}
                                setEmail={setEmail}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                password={password}
                                setPassword={setPassword}
                                role={role}
                                setRole={setRole}
                                error={error}
                                isSubmitting={isSubmitting}
                                handleToggleMode={handleToggleMode}
                            />
                        ) : (
                            <Login
                                handleLogin={handleLogin}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                error={error}
                                isSubmitting={isSubmitting}
                                handleToggleMode={handleToggleMode}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Account;
