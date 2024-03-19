const { DataTypes } = require('sequelize');

module.exports = async (sequelize) => {
    const Admin = sequelize.define('Admin', {
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    await Admin.sync();

    return Admin;
};