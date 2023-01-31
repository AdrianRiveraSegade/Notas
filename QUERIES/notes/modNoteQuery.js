const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const modNoteQuery = async (id, title, text, categories_id, users_id) => {
  let connection;

  try {
    connection = await getConnection();

    const [note] = await connection.query(
      `SELECT id, users_id
      FROM entryNotes AS en 
      WHERE en.id = ?
            `,
      [id]
    );

    if (note.length < 1) {
      throw generateError("Nota no encontrada", 404);
    }

    console.log(note.users_id, users_id, note);

    if (note[0].users_id !== users_id) {
      throw generateError("No tienes permisos para modificar la nota", 401);
    }

    const [modNote] = await connection.query(
      `UPDATE entryNotes SET title = ?, text = ?, categories_id = ? WHERE id = ?`,
      [title, text, categories_id, id]
    );

    return modNote.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = modNoteQuery;
