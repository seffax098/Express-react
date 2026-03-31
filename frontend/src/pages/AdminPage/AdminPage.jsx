import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import styles from './AdminPage.module.scss'
import { getUsers, deleteUser, putUser } from 'api/users'
import { getMe } from 'api/auth'
import UsersList from './components/UsersList'
import Navbar from 'components/Navbar'
import UserModal from './components/UserModal/UserModal'

const AdminPage = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authChecked, setAuthChecked] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalMode, setModalMode] = useState("create")
    const [editingUser, setEditingUser] = useState(null)

    const loadUsers = async () => {
        try {
            setLoading(true)
            const response = await getUsers()
            setUsers(response)
        } catch (err) {
            console.log(err)
            alert(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const initPage = async () => {
            try {
                const currentUser = await getMe()

                if (currentUser.role !== 'admin') {
                    setIsAdmin(false)
                    return
                }

                setIsAdmin(true)
                await loadUsers()
            } catch (err) {
                console.log(err)
                setIsAdmin(false)
            } finally {
                setAuthChecked(true)
            }
        }

        initPage()
    }, [])

    const handleBlock = async (id) => {
        try {
            await deleteUser(id)
            await loadUsers()
        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    const openEdit = (user) => {
        setModalMode("edit")
        setEditingUser(user)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEditingUser(null)
    }

    const handleSubmitModal = async (user) => {
        try {
            const updatedUser = await putUser(user.id, user)
            setUsers((prev) =>
                prev.map((u) => (u.id === user.id ? updatedUser : u))
            )
            closeModal()
        } catch (err) {
            console.error(err)
            alert("Ошибка сохранения пользователя")
        }
    }

    if (!authChecked) {
        return (
            <div className={styles.adminPage}>
                <Navbar />
                <div className={styles.users}>
                    <p>Загрузка...</p>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/account" replace />
    }

    return (
        <div className={styles.adminPage}>
            <Navbar />
            <div className={styles.users}>
                {loading && <p>Загрузка...</p>}
                {users && <UsersList users={users} onDelete={handleBlock} onEdit={openEdit} />}
            </div>

            <UserModal
                open={modalOpen}
                mode={modalMode}
                initialUser={editingUser}
                onClose={closeModal}
                onSubmit={handleSubmitModal}
            />
        </div>
    )
}

export default AdminPage
