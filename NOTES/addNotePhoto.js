const selectEntryNotesByIdQuery = require("../QUERIES/notes/selectEntryNotesByIdQuery");
const insertPhotoQuery = require("../QUERIES/notes/insertPhotoQuery");

const { generateError, savePhoto } = require("../helpers");

const addNotePhoto = async (req, res, next) => {
  try {
    const { idEntryNote } = req.params;

    //No hay foto?? error al canto mi rey
    if (!req.files?.photo) {
      throw generateError("Faltan campos (foto)", 400);
    }

    const note = await selectEntryNotesByIdQuery(idEntryNote);

    //Que no es tuya la nota?? error al canto mi rey
    if (note.idUsers !== req.users.id) {
      throw generateError("Permisos insuficientes", 401);
    }

    //la entrada no puede tener mas de 1 foto, si ya tiene, adivina mi rey.
    if (note.photos.length > 0) {
      throw generateError("La entrada no puede tener mas fotos", 403);
    }

    //guardamos la foto en el disco y obtenemos el nombre
    const photoName = await savePhoto(req.files.photo);

    //guardamos la foto en la base de datos
    await insertPhotoQuery(photoName, idEntryNote);

    res.send({
      status: "ok",
      message: "Foto insertada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addNotePhoto;
