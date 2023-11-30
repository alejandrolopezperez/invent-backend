const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const Shipment = require("../models/shipment");

const getShipments = async (req, res = response) => {
    try {
        const shipments = await Shipment.findAll();
        res.status(200).json({
            ok: true,
            shipments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const getShipmentById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const shipment = await Shipment.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        if (!shipment) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el envio",
            });
        }

        res.status(200).json({
            ok: true,
            shipment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const createShipment = async (req, res = response) => {
    const body = req.body;
    try {
        const data = {
            id: uuidv4(),
            ...body,
        };

        const shipment = new Shipment(data);
        await shipment.save();

        res.status(200).json({
            ok: true,
            msg: "Envio creado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const updateShipment = async (req, res = response) => {
    const body = req.body;
    console.log(body)
    try {
        const shipment = await Shipment.findByPk(body.id);

        if (!shipment) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el envio",
            });
        }

        await shipment.update(body);

        res.status(200).json({
            ok: true,
            msg: "Envio actualizado correctamente",
        });
    } catch (error) {}
};

const deleteShipment = async (req, res = response) => {
    const { id } = req.params;

    try {
        const shipment = await Shipment.findByPk(id);

        if (!shipment) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el envio",
            });
        }

        await shipment.destroy();

        res.status(200).json({
            ok: true,
            msg: "Envio eliminado correctamente",
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
    getShipments,
    createShipment,
    updateShipment,
    deleteShipment,
    getShipmentById,
};
