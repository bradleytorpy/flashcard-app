const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple test route
app.get("/api/test", (req, res) => {
  res.send("Hello! This is a test endpoint.");
});

// Flashcards route
const flashcardsRouter = require('./routes/flashcards');
app.use('/api/flashcards', flashcardsRouter);

// Decks route
const decksRouter = require('./routes/decks');
app.use('/api/decks', decksRouter);

// Start the server
const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});