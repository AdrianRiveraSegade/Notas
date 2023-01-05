const selectEntryNotesByIdQuery = require("../QUERIES/notes/selectAllEntryNotesQuery");
const deletePhotoQuery = require("../QUERIES/notes/deletePhotoQuery");

const { generateError } = require("../helpers");

const deleteNotePhoto = async (req, res, next) => {
  try {
    const { idNote, idPhoto } = req.params;

    //obtenemos la entrada
    const note = await selectEntryNotesByIdQuery(idNote);

    //Como que no eres el dueño? sabes lo que toca? efectivamente.
    if (note.idUser !== req.users.id) {
      throw generateError("Permisos insuficientes", 401);
    }

    //borramos la foto
    await deletePhotoQuery(idPhoto);

    res.send({
      status: "ok",
      message: "Foto eliminada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteNotePhoto;
