const selectEntryNotesByIdQuery = require("../QUERIES/notes/selectEntryNotesByIdQuery");

const getNote = async (req, res, next) => {
  try {
    const { idEntryNote } = req.params;

    const note = await selectEntryNotesByIdQuery(idEntryNote);

    res.send({
      status: "ok",
      data: {
        note,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getNote;
