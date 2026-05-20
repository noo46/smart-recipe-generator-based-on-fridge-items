import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Recipes from "./components/Recipes";
import Newsletter from "./components/Newsletter";

import SavedRecipes from "./pages/SavedRecipes";
import SearchPage from "./pages/SearchPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// 👇 Navbar ko control karne ke liye
function Layout() {
  const location = useLocation();

  // Navbar hide on auth pages
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Categories />
              <Recipes />
              <Newsletter />
            </>
          }
        />

        {/* Recipes */}
        <Route path="/recipes" element={<SavedRecipes />} />

        {/* Categories */}
        <Route path="/categories" element={<SearchPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;