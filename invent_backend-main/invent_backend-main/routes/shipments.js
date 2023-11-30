const express = require("express");
const { getShipments, getShipmentById, deleteShipment, createShipment, updateShipment } = require("../controllers/shipments");

const router = express.Router();

router.get("/get", getShipments);
router.get("/get/:id", getShipmentById);
router.post("/create", createShipment);
router.put("/update", updateShipment);

router.delete("/delete/:id", deleteShipment);

module.exports = router;
