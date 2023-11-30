const express = require("express");
const { getCompanies, getCompanyById, deleteCompany, createCompany } = require("../controllers/companies");

const router = express.Router();

router.get("/get", getCompanies);

router.get("/get/:id", getCompanyById);

router.delete("/delete/:id", deleteCompany);

router.post("/create", createCompany);

module.exports = router;
