const modNote = require("../QUERIES/notes/modNoteQuery");
const selectListNotes = require("../QUERIES/notes/selectEntryNoteByIdQuery");

const { generateError } = require("../helpers");

const modNoteS = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text, categories_id } = req.body;

    if (!title || !text || !categories_id)
      throw generateError("Faltan campos", 400);

    await selectListNotes(id);

    await modNote(title, text, categories_id, req.user.id);

    res.send({
      status: "ok",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = modNoteS;
