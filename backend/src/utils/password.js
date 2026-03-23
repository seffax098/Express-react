const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const rounds = 10;
    return bcrypt.hash(password, rounds);
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

module.exports = {
    hashPassword,
    verifyPassword,
};
