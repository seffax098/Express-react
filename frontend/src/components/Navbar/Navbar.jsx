import { useEffect, useState } from 'react'
import styles from './Navbar.module.scss'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import { getMe } from 'api/auth'
import { AUTH_STATE_CHANGED_EVENT } from 'api/client'

const Navbar = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await getMe()
                setUser(currentUser)
            } catch (err) {
                setUser(null)
            }
        }

        loadUser()

        window.addEventListener(AUTH_STATE_CHANGED_EVENT, loadUser)

        return () => {
            window.removeEventListener(AUTH_STATE_CHANGED_EVENT, loadUser)
        }
    }, [])

    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <Link to={'/'} className={styles.brandLink}>
                    <div className={styles.brand}>Интернет-магазин</div>
                </Link>
                <div className={styles.navbar_right}>
                    {user?.role === 'admin' && (
                        <Link to={'/admin'} className={styles.navbar_admin}>
                            Пользователи
                        </Link>
                    )}
                    <Link className={styles.profile} to={'/account'}>
                        <Profile />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar
