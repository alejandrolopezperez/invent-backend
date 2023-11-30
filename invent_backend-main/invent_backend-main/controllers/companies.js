const { response } = require("express");
const Company = require("../models/company");
const {v4:uuidv4} = require("uuid")

const getCompanies = async (req, res = response) => {
    try {
        const companies = await Company.findAll();

        res.status(200).json({
            ok: true,
            companies,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const getCompanyById = async (req, res = response) => {
    const { id } = req.params;

    try {
        const company = await Company.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).json({
            ok: true,
            company,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const deleteCompany = async (req, res = response) => {
    const { id } = req.params;
    try {
        const company = await Company.findByPk(id);

        if (!company) {
            return res.status(404).json({
                ok: false,
                msg: "No existe el envio",
            });
        }

        await company.destroy();

        res.status(200).json({
            ok: true,
            msg: "Compañia eliminada correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor",
        });
    }
};

const createCompany = async (req, res = response) => {
    const body = req.body;
    let array = []

    const arrayZipcode=body.zipcodes.split(',')
    
    arrayZipcode.forEach(element => {
        element.split(",").forEach((item) => {
            array.push(parseFloat(item))
        })
    });


    
    try {
        const data = {
            id: uuidv4(),
            name: body.name,
            zipcodes: array
        }
        
        const company = new Company(data);
        await company.save();

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

module.exports = {
    getCompanies,
    getCompanyById,
    deleteCompany,
    createCompany
};
