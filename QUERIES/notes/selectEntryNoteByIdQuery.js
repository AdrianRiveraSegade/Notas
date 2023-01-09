const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const selectEntryNoteByIdQuery = async (entryNoteId) => {
  let connection;
  try {
    connection = await getConnection();

    const [notes] = await connection.query(
      `SELECT id, title, users_id, createdAt
            FROM entryNotes WHERE id = ?`,
      [entryNoteId]
    );

    if (notes.length < 1) {
      throw generateError("Nota no encontrada", 404);
    }
    return notes[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectEntryNoteByIdQuery;
