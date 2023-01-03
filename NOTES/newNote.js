const insertEntryNotesQuery = require("../QUERIES/notes/insertEntryNotesQuery");
const insertPhotoQuery = require("../QUERIES/notes/insertPhotoQuery");

const { generateError, savePhoto } = require("../helpers");

const newEntryNote = async (req, res, next) => {
  try {
    const { title, text } = req.body;

    if (!title || !text) {
      throw generateError("Faltan campos", 400);
    }

    //insertamos una nota nueva y obtenemos el id que se le asigna
    const idEntryNotes = await insertEntryNotesQuery(title, text, req.users.id);

    //Creamos un array donde se guardara el nombre de la foto, en caso de que exista
    const photos = [];

    //guardamos la foto (codigo copiado descaradamente de david, ¿Esta mal? HELP ME STEFANO)
    if (req.files) {
      for (const photo of Object.values(req.files).slice(0, 1)) {
        //guardamos la foto el almacenamiento
        const photoName = await savePhoto(photo, 1);

        //metemos el nombre de la foto en el array de antes
        photos.push(photoName);

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
          photos,
          idUser: req.users.id,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEntryNote;
