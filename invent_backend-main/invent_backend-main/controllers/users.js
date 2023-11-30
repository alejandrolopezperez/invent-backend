const { response } = require("express");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");

const createUser = async (req, res = response) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    let user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      return res.status(400).json({
        msg: "El usuario ya existe",
      });
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    const data = {
      id: uuidv4(),
      username,
      password: hash,
    };

    user = new User(data);
    await user.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const getUsers = async (req, res = response) => {
  try {
    const users = await User.findAll()

    res.status(200).json({
        ok: true,
        users
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  createUser,
  getUsers
};
