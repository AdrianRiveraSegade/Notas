const getConnection = require("../../BBDD/getConnection");
const modNoteQuery = async (title, text, categories_id, users_id) => {
  let connection;

  try {
    connection = await getConnection();

    const [modNote] = await connection.query(
      `
            UPDATE entryNotes SET title = ?, text = ?, categories_id = ? WHERE users_id = ?`,
      [title, text, categories_id, users_id]
    );

    return modNote.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modNoteQuery;
