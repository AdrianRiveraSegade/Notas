const getConnection = require("../../BBDD/getConnection");

const insertCategoryQuery = async (categoryName) => {
  let connection;

  try {
    connection = await getConnection();

    //insertamos una categoria nueva
    const [newCategory] = await connection.query(
      `INSERT INTO categories (categoryName)
            VALUES (?)`,
      [categoryName]
    );

    console.log(newCategory);

    //obtenemos el id de la nueva categoria
    return newCategory.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertCategoryQuery;
