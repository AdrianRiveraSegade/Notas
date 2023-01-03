const getConnection = require("../../BBDD/getConnection");
const { generateError } = require("../../helpers");

const deleteCategoriesQuery = async (categoryName) => {
  let connection;

  try {
    connection = await getConnection();

    //seleccionamos la categoria
    const [deleteCategories] = await connection.query(
      `SELECT categoryName FROM categories WHERE categoryName = ?`,
      [categoryName]
    );
    //comprobamos que la "category" existe
    if (categoryName.length < 1) {
      throw generateError("Categoria no encontrada", 404);
    }
    //borramos la categoria
    await connection.query(`DELETE FROM categories WHERE categoryName = ?`, [
      categoryName,
    ]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteCategoriesQuery;
