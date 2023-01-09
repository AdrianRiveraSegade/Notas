const selectAllEntryNotesQuery = require("../QUERIES/notes/selectAllEntryNotesQuery");

const listOfNotes = async (req, res, next) => {
  try {
    // Array de notas.
    const notes = await selectAllEntryNotesQuery(req.user.id);

    res.send({
      status: "ok",
      data: {
        notes,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listOfNotes;
