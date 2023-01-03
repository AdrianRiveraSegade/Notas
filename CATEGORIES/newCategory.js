const insertCategoriesQuery = require("../QUERIES/categories/insertCategoriesQuery");

const generateError = require("../helpers");

const newCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName) {
      throw generateError("Faltan campos", 400);
    }

    const idCategory = await insertCategoriesQuery(categoryName, req.user.id);

    //array para pushear el nombre de las nuevas categorías
    const categories = [];

    //si

    await insertCategoriesQuery;
  } catch (err) {
    next(err);
  }
};

module.exports = newCategory;
