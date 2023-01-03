const insertUserQuery = require("../QUERIES/users/insertUserQueries");

//const { v4: uuid } = require("uuid");

const { generateError } = require("../helpers.js");

const newUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw generateError("Faltan campos", 400);
    }

    await insertUserQuery(username, email, password);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
