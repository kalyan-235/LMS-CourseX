import Note from "../models/Note.js";

export const getNotes = async (
  req,
  res
) => {
  try {
    const notes =
      await Note.find({
        userId: req.user.id,
        courseId:
          req.params.courseId,
      });

    res.json(notes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const addNote = async (
  req,
  res
) => {
  try {
    const note =
      await Note.create({
        userId: req.user.id,
        courseId:
          req.params.courseId,
        content:
          req.body.content,
      });

    res.status(201).json(
      note
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteNote =
  async (req, res) => {
    try {
      await Note.findByIdAndDelete(
        req.params.noteId
      );

      res.json({
        message:
          "Note deleted",
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };