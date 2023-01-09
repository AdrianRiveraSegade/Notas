const selectEntryNoteByIdQuery = require("../QUERIES/notes/selectEntryNoteByIdQuery");

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const note = await selectEntryNoteByIdQuery(id);

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
