module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Note', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    });
};
