import React from "react";
import "../App.css";

function Categories() {
const data = [
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400"
  },
 {
  name: "Pasta",
  img: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=400&q=80"
},
  {
    name: "Vegan",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400"
  },
  {
    name: "Dessert",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400"
  }
];

  return (
    <section className="categories">
      <h2>Popular Categories</h2>
      <div className="category-grid">
        {data.map((item, index) => (
          <div key={index} className="category-card">
            <img src={item.img} alt="" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;