const { v4: uuid } = require('uuid');

const { generateError } = require(../helpers.js);

const newUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if ( !username || !email || !password) {
        throw generateError('Faltan campos', 400);
    }

    //Generamos un código de registro de usuario
    const registrationCode = uuid();

    res.send({
        status:'ok',
        data: {
            registrationCode,
        },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
