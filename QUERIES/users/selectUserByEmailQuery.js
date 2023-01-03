const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");
const selectUserByIdQuery = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [users] = await connection.query(
      `SELECT id, email, createdAt FROM users WHERE email = ?`,
      [email]
    );

    if (users.length < 1) {
      throw generateError("Usuario no encontrado/email incorrecto", 404);
    }

    return users[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUserByIdQuery;
