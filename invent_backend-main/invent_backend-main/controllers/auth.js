const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generarJWT } = require("../helpers/jwt");

const setLogin = async (req, res = response) => {
    const body = req.body;

    try {
        const user = await User.findOne({
            where: {
                username: body.username,
            },
        });

        if (user) {
            const validPassword = bcrypt.compareSync(body.password, user.password);

            if (!validPassword) {
                res.status(400).json({
                    ok: true,
                    msg: "Contaseña incorrecta",
                });
            } else {
                const token = await generarJWT(user.id);

                res.status(200).json({
                    ok: true,
                    uid: user.id,
                    username: user.username,
                    token,
                });
            }
        } else {
            res.status(404).json({
                ok: false,
                msg: "Este usuario no existe",
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: "Ha ocurrido un error inesperado",
        });
        console.log(error);
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    const user = await User.findOne({
        where: {
            id: uid,
        },
    });

    const token = await generarJWT(uid);

    res.status(200).json({
        ok: true,
        uid,
        token,
        username: user.username,
    });
};

module.exports = {
    setLogin,
    renewToken,
};
