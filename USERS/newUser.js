const insertUserQuery = require("../QUERIES/users/insertUserQueries");

//const { v4: uuid } = require("uuid");

const { generateError } = require("../helpers.js");

//Help me Stefano
const newUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError("Faltan campos", 400);
    }

    await insertUserQuery(email, password);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
