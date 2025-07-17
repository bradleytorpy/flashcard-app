// backend/routes/flashcards.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const flashcards = await prisma.flashcard.findMany();
    res.json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flashcards', details: error.message });
  }
});

module.exports = router;
