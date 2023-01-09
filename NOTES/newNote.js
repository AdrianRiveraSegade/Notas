const insertEntryNotesQuery = require("../QUERIES/notes/insertEntryNotesQuery");
const insertPhotoQuery = require("../QUERIES/notes/insertPhotoQuery");

const { generateError, savePhoto } = require("../helpers");

const newEntryNote = async (req, res, next) => {
  try {
    const { title, text, categories_id } = req.body;

    if (!title || !text || !categories_id) {
      throw generateError("Faltan campos", 400);
    }

    //insertamos una nota nueva y obtenemos el id que se le asigna
    const idEntryNotes = await insertEntryNotesQuery(
      title,
      text,
      categories_id,
      req.user.id
    );

    //Creamos un array donde se guardara el nombre de la foto, en caso de que exista
    let photoName;

    //guardamos la foto (codigo copiado descaradamente de david, ¿Esta mal? HELP ME STEFANO)
    if (req.files) {
      for (const photo of Object.values(req.files).slice(0, 1)) {
        //guardamos la foto el almacenamiento
        photoName = await savePhoto(photo, 0);

        //guardamos la foto en la base de datos
        await insertPhotoQuery(photoName, idEntryNotes);
      }
    }

    res.send({
      status: "ok",
      data: {
        entry: {
          id: idEntryNotes,
          title,
          text,
          photoName,
          idUser: req.user.id,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntryNote;
