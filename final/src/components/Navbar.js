import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  // Check token
  const token = localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully ✅");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>TastyHub</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/recipes">Recipes</Link>

        <Link to="/categories">Categories</Link>

        {/* Show Login or Logout */}
        {token ? (

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        ) : (

          <Link to="/login">Login</Link>

        )}

      </div>
    </nav>
  );
}

export default Navbar;