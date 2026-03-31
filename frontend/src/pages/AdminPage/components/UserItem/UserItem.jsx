import styles from './UserItem.module.scss'

const UserItem = ({user, onDelete, onEdit}) => {
    
    return (
        <div className={styles.user}>
            <div className={styles.userInfo}>
                <h2 className={styles.userEmail}>Email: {user.email}</h2>
                <p className={styles.userName}>Name: {user.first_name} {user.last_name}</p>
                <p className={styles.role}>Role: {user.role}</p>
            </div>
            <div className={styles.buttons}>
                <button className={styles.button_update} onClick={() => onEdit(user)}>Редактировать</button>
                <button className={styles.button_delete} onClick={() => onDelete(user.id)}>Заблокировать</button>
            </div>
        </div>
    )
}

export default UserItem