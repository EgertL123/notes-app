const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);
const Note = require('./note')(sequelize, DataTypes);

User.hasMany(Note);
Note.belongsTo(User);

module.exports = { sequelize, User, Note };
