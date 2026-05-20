const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  userId: String,
  title: String,
  image: String,
  ingredients: Array,
  instructions: String,
  category: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);