const getConnection = require("../../BBDD/getConnection");
const { generateError, deletePhoto } = require("../../helpers");

const detelePhotoQuery = async (idEntryPhotos) => {
  let connection;

  try {
    connection = await getConnection();

    //comprobamos que existe una foto
    const [photos] = await connection.query(
      `SELECT name FROM entryPhotos WHERE id = ?`[idEntryPhotos]
    );

    if (photos.length < 1) {
      throw generateError("No se encuentra la foto", 404);
    }

    //borramos la foto del almacenamiento
    await deletePhoto(photos[0].name);

    //borramos la foto
    await connection.query(`DELETE FROM entryPhotos WHERE id = ?`, [
      idEntryPhotos,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deletePhotoQuery;
