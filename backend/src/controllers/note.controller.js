import noteModel from '../models/notes.js'

export const createNotes = async (req, res, next) => {
    try {

        const { title, content } = req.body
        const note = await noteModel.create({
            title,
            content,
            user: req.user
        })

        return res.status(201).json({
            success: true,
            note,
            message: "Note created successfully"
        })
    } catch (err) {
        next(err)
    }
}

export const getAllNotes = async (req, res, next) => {
    try {
        const notes = await noteModel.find({ user: req.user }).sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            notes
        })
    } catch (err) {
        next(err)
    }
}

export const getNoteById = async (req, res, next) => {
    try {
        const note = await noteModel.findOne({
            _id: req.params.id,
            user: req.user
        })
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
         return res.status(200).json({
            success: true,
            note
        })

    } catch (err) {
        next(err)
    }
}

export const updateNote = async (req, res, next) => {
  try {
    const note = await noteModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

     return res.status(200).json({
            success: true,
            note
        })

  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await noteModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    next(err);
  }
};