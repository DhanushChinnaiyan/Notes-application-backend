const express = require("express");
const Notes = require("../Model/NotesModel.js");
const { default: mongoose } = require("mongoose");

const router = express.Router();

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const userId = req.userId;

    const allCategories = await Notes.distinct("category", { userId });

    return res.status(200).json(allCategories);
  } catch (error) {
    console.error("Error getting categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get notes by seleted category
router.get("/category/notes", async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: "Category parameter missing" });
    }

    const selectedCategoryNotes = await Notes.find({ userId, category });

    return res.status(200).json(selectedCategoryNotes);
  } catch (error) {
    console.error("Error getting category notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get notes by search query
router.get("/search", async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title parameter missing" });
    }

    const regex = new RegExp(title, "i");

    const query = {
      userId: userId,
      title: { $regex: regex },
    };

    const searchedNotes = await Notes.find(query);

    return res.status(200).json(searchedNotes);
  } catch (error) {
    console.error("Error searching notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
