const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite:./database.sqlite', {
    logging: false
});

module.exports = sequelize;
