const { User } = require('../models');

class UserRepository {
    findById(id) {
        return User.findByPk(id);
    }
}

module.exports = new UserRepository();
