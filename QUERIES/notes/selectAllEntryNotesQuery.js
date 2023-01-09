const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const selectAllEntryNotesQuery = async (user_id) => {
  let connection;
  try {
    connection = await getConnection();

    const [entryNotes] = await connection.query(
      `SELECT id, title, text, categories_id, createdAt
            FROM entryNotes WHERE users_id = ?`,
      [user_id]
    );

    if (entryNotes.length < 1) {
      throw generateError("No se ha encontrado ninguna nota", 404);
    }

    return entryNotes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEntryNotesQuery;
