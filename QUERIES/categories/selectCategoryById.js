const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const selectCategoryByIdQuery = async (categoryName) => {
  let connection;
  try {
    connection = await getConnection();

    const [category] = await connection.query(
      `SELECT id FROM categories WHERE categoryName = ?`,
      [categoryName]
    );

    if (category.length < 1) {
      throw generateError("No se ha encontrado ninguna categoria", 404);
    }
    return {
      category,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectCategoryByIdQuery;
