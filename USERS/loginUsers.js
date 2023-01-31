const selectUserByEmailQuery = require("../QUERIES/users/selectUserByEmailQuery");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers.js");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Faltan campos", 400);
    }

    //Obtenemos el id del body
    const user = await selectUserByEmailQuery(email);
    //console.log(password, user.password);
    //Comprobamos si la contraseña es válida
    const validPassword = await bcrypt.compare(password, user.password);

    //Si la contraseña no es correcta lanzamos un error
    if (!validPassword) {
      throw generateError("Contraseña incorrecta", 401);
    }

    //Obeto para guardar los datos que queremos introducir en el token
    const tokenInfo = {
      id: user.id,
    };

    //Se crea el token
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
