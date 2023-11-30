const { response } = require("express");
const Package = require("../models/package");

const getTypePackages = async (req, res = response) => {
    try {
        const typePackages = await Package.findAll();

        res.status(200).json({
            ok: true,
            typePackages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};
module.exports = {
    getTypePackages,
};
