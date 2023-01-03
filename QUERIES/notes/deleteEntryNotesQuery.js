const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const deleteEntryNotesQuery = async (users_id, title) => {
  let connection;

  try {
    connection = await getConnection();

    //seleccionamos la nota
    const [deleteEntryNotes] = await connection.query(
      `SELECT users_id FROM entryNotes WHERE users_id = ?`,
      [users_id]
    );
    //comprobamos que quien intenta borrar la nota, es el dueño
    if (deleteEntryNotes.users_id !== users_id) {
      throw generateError("No tienes permisos", 401);
    }
    //borramos la nota
    await connection.query(`DELETE FROM entryNotes WHERE title = ?`, [title]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteEntryNotesQuery;
