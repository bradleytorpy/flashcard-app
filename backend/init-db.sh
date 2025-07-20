#!/bin/sh

echo "Waiting for database to be ready..."
npx prisma migrate deploy
# npm run db:seed-kanji

echo "Database migrations and seeding completed!" 