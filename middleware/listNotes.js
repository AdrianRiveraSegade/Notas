const listNotes = require("../QUERIES/notes/selectListNotes");

const listOfNotes = async (req, res, next) => {
  try {
    const { users_id } = req.params;

    // Array de notas.
    const notes = await listNotes(users_id);

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
