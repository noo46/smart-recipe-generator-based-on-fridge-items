const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/tastyhub")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/recipes", require("./routes/recipe"));
// Test route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});