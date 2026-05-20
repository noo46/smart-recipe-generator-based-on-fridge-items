import React, { useState } from "react";
import "./SearchPage.css";

function SearchPage() {
  const categories = ["Chinese", "Desi", "Dessert", "Italian", "Fast Food"];

  const [selected, setSelected] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // ✅ NEW

  const API_KEY = "22e2b8fa885e4fdca3fd63480026a792"; 

  // 🔍 SEARCH RECIPES
const handleSearch = async () => {

  try {

    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=20&ranking=1&ignorePantry=true&apiKey=${API_KEY}`
    );

    const data = await response.json();

    // Cuisine keywords
    const cuisineKeywords = {

      "Fast Food": [
        "burger",
        "pizza",
        "fries",
        "sandwich",
        "wrap"
      ],

      "Chinese": [
        "noodle",
        "fried rice",
        "manchurian",
        "chow mein"
      ],

      "Italian": [
        "pasta",
        "pizza",
        "lasagna"
      ],

      "Dessert": [
        "cake",
        "cookie",
        "ice cream"
      ],

      "Desi": [
        "biryani",
        "karahi",
        "curry",
        "masala"
      ]
    };

    // Filter relevant recipes
const filteredRecipes = data.filter((recipe) => {

  const title = recipe.title.toLowerCase();

  // cuisine keywords
  const keywords = cuisineKeywords[selected] || [];

  // agar keyword match kare
  const matched = keywords.some((word) =>
    title.includes(word.toLowerCase())
  );

  // OR chicken/rice waghera included hon
  const ingredientMatch = ingredient
    .toLowerCase()
    .split(",")
    .some((item) => title.includes(item.trim()));

  return matched || ingredientMatch;
});
    setRecipes(filteredRecipes);

  } catch (error) {

    console.log(error);

  }
};

  // 📖 GET FULL RECIPE DETAILS
  const getRecipeDetails = async (id) => {
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      const data = await res.json();
      setSelectedRecipe(data); // ✅ show in UI

    } catch (err) {
      console.log(err);
    }
  };
const handleSave = async (recipe) => {
  const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token"); // ✅ ADD THIS
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/recipes/save", {
      method: "POST",
      
          headers: {
        "Content-Type": "application/json",
        Authorization: token, // ✅ IMPORTANT
      },
      
      body: JSON.stringify({
      userId: user._id,
        title: recipe.title,
        image: recipe.image,
        ingredients: recipe.extendedIngredients || [],
        instructions: recipe.instructions || "",
        category: selected,
      }),
    });

    const data = await res.json();
    alert(data.msg);

  } catch (err) {
    console.log(err);
  }
};
  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">
        <h1>🍽️ Discover Recipes You’ll Love</h1>
        <p>Select a category and search by ingredients</p>
      </div>

      {/* CATEGORY */}
      <div className="category-row">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${selected === cat ? "active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter ingredients (e.g. chicken, rice...)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* RESULTS */}
      <div className="grid">
        {recipes.length === 0 ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            No recipes found. Try searching!
          </p>
        ) : (
          recipes.map((recipe) => (
            <div className="card" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />

              <div className="card-body">
                <h3>{recipe.title}</h3>

                <button onClick={() => getRecipeDetails(recipe.id)}>
                  View Recipe
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ RECIPE DETAILS  */}
      {selectedRecipe && (
        <div className="recipe-details">
          <h2>{selectedRecipe.title}</h2>
        


          <img src={selectedRecipe.image} alt="" />

          <h3>Ingredients:</h3>
          <ul>
            {selectedRecipe.extendedIngredients?.map((item, i) => (
              <li key={i}>{item.original}</li>
            ))}
          </ul>

          <h3>Instructions:</h3>
          <div
            dangerouslySetInnerHTML={{
              __html:
                selectedRecipe.instructions ||
                "No instructions available",
            }}
          ></div>
            <button 
             className="save-btn"
            onClick={() => handleSave(selectedRecipe)}>
    ❤️ Save Recipe
  </button>

        </div>
      )}

    </div>
  );
}

export default SearchPage;