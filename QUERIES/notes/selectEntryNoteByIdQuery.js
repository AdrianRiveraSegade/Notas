const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const selectEntryNoteByIdQuery = async (entryNoteId) => {
  let connection;
  try {
    connection = await getConnection();

    const [notes] = await connection.query(
      `SELECT en.id, en.title, en.text, en.categories_id, c.categoryName, ep.name AS photo,  users_id, en.createdAt
      FROM entryNotes AS en 
      LEFT JOIN categories AS c ON (c.id = en.categories_id )
      LEFT JOIN entryPhotos AS ep ON (ep.entryNotes_id = en.id )
      WHERE en.id = ?
            `,
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
