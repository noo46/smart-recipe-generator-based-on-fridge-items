import React, { useEffect, useState } from "react";
import "./SavedRecipes.css";

function SavedRecipes() {

  // ✅ SAFE STATE
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  // 📥 GET SAVED RECIPES
  const fetchRecipes = async () => {

    // ✅ EXTRA SAFE USER PARSE
    let user = null;

    try {
      user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
    } catch (error) {
      console.log("Invalid user data");
      localStorage.removeItem("user");
    }

    const token = localStorage.getItem("token");

    // ❌ IF USER NOT LOGGED IN
    if (!user || !token) {
      setRecipes([]);
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:5000/api/recipes/${user._id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      // ✅ ENSURE ARRAY
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        setRecipes([]);
      }

    } catch (err) {

      console.log(err);

      // ✅ PREVENT CRASH
      setRecipes([]);
    }
  };

  // 🗑 DELETE RECIPE
  const handleDelete = async (id) => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login required");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:5000/api/recipes/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      alert(data.msg);

      // ✅ REMOVE FROM UI
      setRecipes((prev) =>
        prev.filter((recipe) => recipe._id !== id)
      );

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="saved-page">

      <h1>❤️ Saved Delicious Recipes</h1>

      {/* ✅ NO RECIPES */}
      {recipes.length === 0 ? (

        <p className="empty">
          No recipes saved yet
        </p>

      ) : (

        <div className="grid">

          {recipes.map((recipe) => (

            <div className="card" key={recipe._id}>

              <img
                src={recipe.image}
                alt={recipe.title}
              />

              <div className="card-body">

                <h3>{recipe.title}</h3>

                <p className="category">
                  {recipe.category}
                </p>

                <h4>Ingredients:</h4>

                <ul>
                  {recipe.ingredients?.map((item, i) => (
                    <li key={i}>
                      {typeof item === "string"
                        ? item
                        : item.original}
                    </li>
                  ))}
                </ul>

                <h4>Instructions:</h4>

                <p className="instructions">
                  {recipe.instructions
                    ? recipe.instructions.replace(/<[^>]+>/g, "")
                    : "No instructions available"}
                </p>

                {/* 🗑 DELETE BUTTON */}
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(recipe._id)}
                >
                  🗑 Delete Recipe
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default SavedRecipes;