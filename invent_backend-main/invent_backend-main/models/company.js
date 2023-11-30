const { DataTypes } = require("sequelize");
const db = require("../models/db");

const Company = db.sequelize.define("external_companies", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(256),
    },
    zipcodes: {
        type: DataTypes.JSON,
    },
});

module.exports = Company;
