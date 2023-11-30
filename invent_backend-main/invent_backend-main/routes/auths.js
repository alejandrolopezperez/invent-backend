const express = require("express");
const { setLogin, renewToken } = require("../controllers/auth");

const router = express.Router();

router.post("/login", setLogin);

module.exports = router;
