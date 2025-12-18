const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Note = require('./note')(sequelize, Sequelize.DataTypes);

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Note
};
