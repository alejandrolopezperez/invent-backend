const express = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const { createUser, getUsers } = require("../controllers/users");

const router = express.Router();

router.post("/create", createUser);

router.get("/get", getUsers)

module.exports = router;
