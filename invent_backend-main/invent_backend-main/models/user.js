const { DataTypes } = require("sequelize");
const db = require("../models/db");

const User = db.sequelize.define("users", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(256),
    },
    password: {
        type: DataTypes.STRING(256),
    },
});

module.exports = User;
