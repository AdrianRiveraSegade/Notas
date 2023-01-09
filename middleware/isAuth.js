const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("No tiene autorizacion mi rey", 400);
    }

    //variable donde se almacenara la informacion del token
    let tokenInfo;

    try {
      tokenInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }
    //Creamos la propiedad user en el objeto req
    req.user = tokenInfo;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
