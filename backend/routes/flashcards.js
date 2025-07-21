// backend/routes/flashcards.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    const where = search ? {
      OR: [
        { kanji: { search: search } },
        { onyomi: { search: search } },
        // { kunyomi: { search: search } },
        // { meanings: { search: search } },
        // { levels: { search: search } },
        // { radicals: { search: search } }
      ]
    } : {};

    const [flashcards, total] = await Promise.all([
      prisma.flashcard.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.flashcard.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: flashcards,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve flashcards', details: error.message });
  }
});

module.exports = router;
