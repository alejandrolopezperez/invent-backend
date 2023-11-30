const { DataTypes } = require("sequelize");
const db = require("../models/db");

const Shipment = db.sequelize.define("shipments", {
    id: {
        type: DataTypes.STRING(256),
        primaryKey: true,
    },
    address: {
        type: DataTypes.STRING(256),
    },
    zipcode: {
        type: DataTypes.STRING(256),
    },
    addressee: {
        type: DataTypes.STRING(256),
    },
    sender: {
        type: DataTypes.STRING(256),
    },
    weight: {
        type: DataTypes.STRING(256),
    },
    package: {
        type: DataTypes.STRING(256),
    },
    price: {
        type: DataTypes.STRING(256),
    },
    company: {
        type: DataTypes.STRING(256),
    },
});

module.exports = Shipment;
