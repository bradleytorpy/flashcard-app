// backend/routes/flashcards.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const decks = await prisma.deck.findMany({
        include: {
            _count: {
                select: { flashcards: true }
            },
            user: {
                select: {
                    username: true
                }
            }
        }
    });
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve decks', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const deck = await prisma.deck.findUnique({
            where: { id: parseInt(id) },
            include: { flashcards: true, user: true }
        });

        if (!deck) {
            return res.status(404).json({ error: 'Deck not found' });
        }

        res.json(deck);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve deck', details: error.message });
    }
})

module.exports = router;
