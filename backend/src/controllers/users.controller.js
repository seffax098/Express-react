const users = require('../data/users')
const { hashPassword } = require('../utils/password')

const sanitizeUser = (user) => {
    const { password, ...safeUser } = user
    return safeUser
}

const findUserById = (id) => users.find((user) => user.id === id)

const getUsers = (req, res) => {
    return res.status(200).json({
        users: users.map(sanitizeUser)
    })
}

const getUserById = (req, res) => {
    const { id } = req.params
    const user = findUserById(id)

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    return res.status(200).json({
        user: sanitizeUser(user)
    })
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const user = findUserById(id)

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    const { email, first_name, last_name, password, role } = req.body

    if (!email && !first_name && !last_name && !password && !role) {
        return res.status(400).json({
            error: 'Nothing to update'
        })
    }

    if (email) user.email = email
    if (first_name) user.first_name = first_name
    if (last_name) user.last_name = last_name
    if (password) user.password = await hashPassword(password)
    if (role) user.role = role

    return res.status(200).json({
        user: sanitizeUser(user)
    })
}

const banUser = (req, res) => {
    const { id } = req.params
    const user = findUserById(id)

    if (!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    user.role = 'blocked'

    return res.status(200).json({
        message: 'User blocked'
    })
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    banUser
}
