const getConnection = require("../../BBDD/getConnection");

const editCategoryQuery = async (categoryName, id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `UPDATE categories SET categoryName = ? WHERE id = ?`,
      [categoryName, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editCategoryQuery;
