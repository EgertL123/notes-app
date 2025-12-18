const { User } = require('../models');

class UserRepository {
    findById(id) {
        return User.findByPk(id);
    }

    create(user) {
        return User.create(user);
    }
}

module.exports = new UserRepository();
