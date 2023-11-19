const express = require("express");
const Notes = require("../Model/NotesModel.js");

const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.userId })
      .sort({ date: -1 })
      .exec();
    return res.status(200).json(notes);
  } catch (error) {
    console.log("Error getting notes: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Post notes
router.post("/add", async (req, res) => {
  try {
    const userId = req.userId;
    const { title, category, notes } = req.body;
    if (!title || !category || !notes)
      return res.status(400).json({ message: "Provide all details" });

    const newNotes = await Notes.create({
      title,
      category,
      notes,
      userId,
    });

    if (!newNotes)
      return res.status(500).json({ message: "Failed to add notes" });

    return res.status(200).json({ message: "Notes added successfully" });
  } catch (error) {
    console.log("Error posting notes: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update notes
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.userId;
    const { title, category, notes } = req.body;
    if (!title || !category || !notes)
      return res.status(400).json({ message: "Provide all details" });

    const updateNotes = await Notes.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        notes,
        userId,
      },
      { new: true }
    );

    if (!updateNotes)
      return res.status(500).json({ message: "Failed to update notes" });

    return res.status(200).json({ message: "Notes updated successfully" });
  } catch (error) {
    console.log("Error updating notes: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Delete notes
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteNotes = await Notes.findByIdAndDelete(req.params.id);
    if (!deleteNotes)
      return res
        .status(404)
        .json({ message: "Notes not found or already deleted" });
    return res.status(200).json({ message: "Notes deleted successfully" });
  } catch (error) {
    console.log("Error deleting notes: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
