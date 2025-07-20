const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

const seed = async () => {
    try {
        const rawData = fs.readFileSync('./data/kanji-wanikani.json', 'utf8');
        const kanjiData = JSON.parse(rawData);

        const kanji = Object.entries(kanjiData).map(([kanji, data]) => {
            const onyomi = data.wk_readings_on || [];
            const kunyomi = (data.wk_readings_kun || []).map((k) =>
                k.startsWith('!') ? k.slice(1) : k
            );
            const meanings = data.wk_meanings || [];
            const radicals = data.wk_radicals || [];
            const levels = data.wk_level !== undefined ? [String(data.wk_level)] : [];

            return {
                kanji,
                onyomi,
                kunyomi,
                meanings,
                radicals,
                levels,
            };
        });

        console.log(`Seeding ${kanji.length} kanji...`);

        await prisma.flashcard.createMany({
            data: kanji,
        });

        console.log('Kanji seeded successfully');
    } catch (error) {
        console.error('Error seeding kanji:', error);
    }
};

seed().catch((e) => console.error(e)).finally(async () => {
    await prisma.$disconnect();
});