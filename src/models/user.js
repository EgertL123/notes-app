module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: true   // 👈 MUUTUS
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
