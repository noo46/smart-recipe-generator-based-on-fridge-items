import React from "react";
import "../App.css";

function Newsletter() {
  return (
    <footer className="footer-section">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-box brand-box">
          <h2>TastyHub 🍴</h2>

          <p>
            Smart Recipe Generator that helps users discover delicious meals
            using ingredients available in their fridge.
          </p>

          <span className="footer-tagline">
            Cook Smart • Waste Less • Eat Better
          </span>
        </div>

        {/* Quick Links */}
        <div className="footer-box">
          <h3>Quick Links</h3>

          <ul>
            <li><a href="/">Home</a></li>

            <li><a href="/recipes">Recipes</a></li>

            <li><a href="/categories">Categories</a></li>

            <li><a href="/login">Login</a></li>
          </ul>
        </div>

        {/* Recipe Categories */}
        <div className="footer-box">
          <h3>Popular Categories</h3>

          <ul>
            <li>🍔 Fast Food</li>

            <li>🍜 Chinese</li>

            <li>🍰 Desserts</li>

            <li>🍕 Italian</li>

          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>
          © 2026 TastyHub | Smart Recipe Generator Based on Fridge Items
        </p>
      </div>

    </footer>
  );
}

export default Newsletter;