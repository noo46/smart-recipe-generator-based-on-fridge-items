import React from "react";
import "../App.css";

function Hero() {
  return (
 <section className="hero">
      <div className="hero-text">
        <h1>Cook Smart with What You Have </h1>
        
        <p>Turn your fridge items into delicious recipes instantly.</p>
        <button>Explore Recipes</button>
      </div>

      <img
        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
        alt="food"
        className="hero-img"
      />
    </section>
  );
}

export default Hero;