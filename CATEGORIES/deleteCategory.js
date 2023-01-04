//const selectCategoryByIdQuery = require("../QUERIES/categories/selectCategoryByIdQuery");

const deleteCategoriesQuery = require("../QUERIES/categories/deleteCategoriesQuery");

//const { generateError } = require("../helpers");

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    //Obtenemos la categoria.
    //const category = await selectCategoryByIdQuery(id);

    //Borramos la categoría.
    await deleteCategoriesQuery(id);

    res.send({
      status: "ok",
      message: "categoria eliminada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteCategory;
