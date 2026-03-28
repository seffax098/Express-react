import styles from './Navbar.module.scss'
import Profile from './Profile';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <Link to={'/'} className={styles.brandLink}>
                    <div className={styles.brand}>Интернет-магазин</div>
                </Link>
                <Link className={styles.profile} to={'/account'}>
                    <Profile />
                </Link>
            </div>
        </header>
    )
}

export default Navbar;