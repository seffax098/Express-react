import UserItem from "../UserItem";
import styles from './UsersList.module.scss'

const UsersList = ({users, onDelete, onEdit}) => {
    return (
        <div className={styles.adminPanel}>
            {users.map((user) => <UserItem key={user.id} user={user} onDelete={onDelete} onEdit={onEdit}/> )}
        </div>
    )
}

export default UsersList;