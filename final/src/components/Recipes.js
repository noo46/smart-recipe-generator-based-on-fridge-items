
import React from "react";
import "../App.css";
import burgerImg from "../assets/burger.png";
import cakeImg from "../assets/cake.png";
import CheesecakeImg from "../assets/cheesecake.png";
import pancakeImg from "../assets/pancake.png";
import saladImg from "../assets/salad.png";
import cookiesImg from "../assets/cookies.png";
import chineseImg from "../assets/chinese.png";
import biryaniImg from "../assets/biryani.png";
import grilledchickenImg from "../assets/grilledchicken.png";
import cheeseomeletImg from "../assets/cheeseomelet.png";
function Recipes() {
  

  const recipes = [
  { name: "Burger", img: burgerImg },

    {
      name: "Cake",
      img: cakeImg
    },
    {
      name: "Cheesecake",
      img: CheesecakeImg
    },
    {
      name: "Pancake",
      img: pancakeImg
    },
    {
      name: "Salad",
      img: saladImg
    },
    {
      name: "Cookies",
      img: cookiesImg
    },
    {
      name: "Chinese",
      img: chineseImg
    },
    {
      name: "Biryani",
      img: biryaniImg
    },
      {
      name: "Cheeseomelet",
      img: cheeseomeletImg
    },
      {
      name: "Grilled Chicken",
      img: grilledchickenImg
    }
  ];



  return (
    <section className="recipes">
      <h2>Super Delicious</h2>

      <div className="recipe-grid">
        {recipes.map((item, index) => (
          <div key={index} className="recipe-card">
            <img src={item.img} alt={item.name} />

            <h3>{item.name}</h3>
          

           
          </div>
        ))}
      </div>
    </section>
  );
}

export default Recipes;