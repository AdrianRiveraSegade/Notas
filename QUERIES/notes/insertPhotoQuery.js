const getConnection = require("../../BBDD/getConnection");

const insertPhotoQuery = async (photo, entryNotes_id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `INSERT INTO entryPhotos(name, entryNotes_id) VALUES(?,?)`,
      [photo, entryNotes_id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertPhotoQuery;
