import styles from '../../Account.module.scss'

const User = ({ user, handleLogout }) => {
    return (
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
            <div className={styles.profileRow}>
                <span>Role</span>
                <strong>{user.role}</strong>
            </div>
            <button type="button" className={styles.formButton} onClick={handleLogout}>
                <span className={styles.formButtonText}>Logout</span>
            </button>
        </div>
    )
}

export default User
