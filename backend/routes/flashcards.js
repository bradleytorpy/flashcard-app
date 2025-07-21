// backend/routes/flashcards.js
const express = require('express');
const router = express.Router();
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let flashcards = [];
    let total = 0;

    if (search) {
      [flashcards, total] = await searchFlashcardsWithArrays(search, limit, skip);
      total = parseInt(total[0].count);
    } else {
      [flashcards, total] = await Promise.all([
        prisma.flashcard.findMany({
          skip,
          take: limit,
          orderBy: {
            createdAt: 'desc'
          }
        }),
        prisma.flashcard.count()
      ]);
    }

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

const searchFlashcardsWithArrays = async (searchTerm, limit, skip) => {
  const searchPattern = `%${searchTerm}%`;
  
  const searchQuery = Prisma.sql`
    SELECT * FROM "flashcard" 
    WHERE 
      "kanji" ILIKE ${searchPattern}
      OR EXISTS (SELECT 1 FROM unnest("onyomi") AS reading WHERE reading ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("kunyomi") AS reading WHERE reading ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("meanings") AS meaning WHERE meaning ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("levels") AS level WHERE level ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("radicals") AS radical WHERE radical ILIKE ${searchPattern})
    ORDER BY "createdAt" DESC
    LIMIT ${limit} OFFSET ${skip}
  `;
  
  const countQuery = Prisma.sql`
    SELECT COUNT(*) FROM "flashcard" 
    WHERE 
      "kanji" ILIKE ${searchPattern}
      OR EXISTS (SELECT 1 FROM unnest("onyomi") AS reading WHERE reading ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("kunyomi") AS reading WHERE reading ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("meanings") AS meaning WHERE meaning ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("levels") AS level WHERE level ILIKE ${searchPattern})
      OR EXISTS (SELECT 1 FROM unnest("radicals") AS radical WHERE radical ILIKE ${searchPattern})
  `;
  
  return await Promise.all([
    prisma.$queryRaw(searchQuery),
    prisma.$queryRaw(countQuery)
  ]);
};

module.exports = router;
