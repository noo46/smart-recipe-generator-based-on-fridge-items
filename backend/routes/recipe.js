const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/authMiddleware");

// ✅ SAVE (PROTECTED)
router.post("/save", auth, async (req, res) => {
  try {
    const newRecipe = new Recipe({
      ...req.body,
      userId: req.user.id, // from token
    });

    await newRecipe.save();

    res.json({ msg: "Recipe saved successfully" });

  } catch (err) {
    res.status(500).json({ msg: "Error saving recipe" });
  }
});

// ✅ GET USER RECIPES (PROTECTED)
router.get("/", auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching recipes" });
  }
});

router.post("/save", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();

    res.json({ msg: "Recipe saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving recipe" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching recipes" });
  }
});

// ✅ DELETE RECIPE
router.delete("/:id", async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete error" });
  }
});
module.exports = router;