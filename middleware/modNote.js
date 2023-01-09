const modNote = require("../QUERIES/notes/modNoteQuery");
const { generateError } = require("../helpers");

const modNoteS = async (req, res, next) => {
  try {
    const { title, text, categories_id } = req.body;

    if (!title || !text || !categories_id)
      throw generateError("Faltan campos", 400);

    await modNote(title, text, categories_id, req.user.id);

    res.send({
      status: "ok",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = modNoteS;
