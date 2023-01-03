const getConnection = require("../../BBDD/getConnection");
const bcrypt = require("bcrypt");
const { generateError } = require("../../helpers");
const insertUserQuery = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();

    //tratamos de conseguir un usuario con un email
    const [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (users.length > 0) {
      throw generateError("Email ya registrado", 403);
    }

    //encriptamos la contraseña
    const hashPass = await bcrypt.hash(password, 10);

    //insertamos al usuario.
    await connection.query(
      `INSERT INTO users (email, password)
            VALUES (?,?)`,
      [email, hashPass]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
