const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

//Obtenemos las variables de entorno necesarias
const { UPLOADS_DIR } = process.env;

/*
    ################
    #Generate error#
    ################
*/

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.statusCode = status;
  return err;
};

/*
    ############
    #Save Photo#
    ############
*/

const savePhoto = async (img, imgType = 0) => {
  //ruta absoluta al directorio de subidas de archivos
  const uploadsPath = path.join(__dirname, UPLOADS_DIR);

  try {
    //intentamos acceder al directorio uploads
    await fs.access(uploadsPath);
  } catch {
    //si no es posible acceder, lanzara un error, asi que si entramos al catch, creamos el directorio
    await fs.mkdir(uploadsPath);
  }
  //redinmensionamos la imagen, para ello, necesitamos el objeto sharp
  const sharpImg = sharp(img.data);

  //redimensionamos la imagen
  if (!imgType) {
    sharpImg.resize(400);
  } else {
    console.error("algo falla y te se decir lo que es"); //console.error temporal, cambiar para cuando si sepa cual es el error
  }

  //generamos un nombre aleatorio para la imagen
  const imgName = `${uuid()}.jpg`;

  //ruta absoluta a la imagen
  const imgPath = path.join(uploadsPath, imgName);

  //guardamos la imagen en la carpeta uploads
  await sharpImg.toFile(imgPath);

  //retornamos el nombre de la imagen
  return imgName;
};

/*
    ##############
    #Delete Photo#
    ##############
*/

const deletePhoto = async (imgName) => {
  try {
    //creamos la ruta absoluta a la imagen
    const photoPath = path.join(__dirname, UPLOADS_DIR, imgName);
    try {
      //intentamos acceder a la imagen con el metodo acces
      await fs.access(photoPath);
    } catch {
      //si no es posible, lanzamos error y finalizamos la funcion
      return;
    }
    //si la imagen existe, la eliminamos
    await fs.unlink(photoPath);
  } catch {
    throw generateError("Error al eliminar la imagen");
  }
};

module.exports = {
  generateError,
  savePhoto,
  deletePhoto,
};
