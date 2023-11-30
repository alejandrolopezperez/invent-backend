const { DataTypes } = require("sequelize");
const db = require("../models/db");

const Package = db.sequelize.define("types_packages", {
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

module.exports = Package;
