const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const listNotes = async (users_id) => {
  let connection;
  try {
    connection = await getConnection();

    const [listNotes] = await connection.query(
      `SELECT id, title, users_id, createdAt
            FROM entryNotes WHERE users_id = ?`,
      [users_id]
    );
    if (listNotes.length < 1) {
      throw generateError("No se ha encontrado ninguna nota", 404);
    }
    return listNotes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listNotes;
