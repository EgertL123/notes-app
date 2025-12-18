const { User } = require('../models');

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({
            where: { email: email }
        });
    }

    async create(userData) {
        return await User.create(userData);
    }

    async findById(id) {
        return await User.findByPk(id);
    }
}

module.exports = new UserRepository();