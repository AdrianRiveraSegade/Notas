const getConnection = require("../BBDD/getConnection");
const { generateError } = require("../helpers");

const listNotes = async (users_id) => {
  let connection;
  try {
    connection = await getConnection();

    const [entryNotes] = await connection.query(
      `SELECT id, title, users_id, users_email, createdAt
            FROM entryNotes WHERE user_id = ?
            VALUES (?)`,
      [users_id]
    );
    if (entryNotes.length < 1) {
      throw generateError("No se ha encontrado ninguna nota", 404);
    }
    return entryNotes;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listNotes;
