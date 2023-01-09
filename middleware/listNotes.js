const getConnection = require("../BBDD/getConnection");
const { generateError } = require("../helpers");

const listNotes = async () => {
  let connection;
  try {
    connection = await getConnection();

    const [entryNotes] = await connection.query(
      `SELECT id, title, user_id, user_email, createdAt
            FROM entryNotes`
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