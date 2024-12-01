require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const route = require("./Routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json()); // Corrected to include parentheses
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(express.static("uploads")); // Serve static files from 'uploads' folder

app.use(
  session({
    secret: "mohit", // Corrected from 'mysecretkey' to 'secret'
    resave: false,
    saveUninitialized: true,
  })
);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Routes
app.use("/", route);

// Database connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

// Error-handling middleware (placed last)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send("Internal Server Error!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
