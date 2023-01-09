const getConnection = require("../../BBDD/getConnection");
const insertEntryQuery = async (title, text, categories_id, idUser) => {
  let connection;

  try {
    connection = await getConnection();

    //insertamos la nota y obtenemos los datos de la misma
    const [newEntryNote] = await connection.query(
      `
            INSERT INTO entryNotes (title, text, categories_id, users_id)
            VALUES (?, ?, ?, ?)`,
      [title, text, categories_id, idUser]
    );
    //console.log(newEntryNote);

    //retornamos el id que la base de datos le asigna a la entrada
    return newEntryNote.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEntryQuery;
