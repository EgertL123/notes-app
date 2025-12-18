module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'USER'
        }
    });
};