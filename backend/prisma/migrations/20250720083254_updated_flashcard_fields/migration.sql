/*
  Warnings:

  - You are about to drop the column `level` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `meaning` on the `flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `reading` on the `flashcard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flashcard" DROP COLUMN "level",
DROP COLUMN "meaning",
DROP COLUMN "reading",
ADD COLUMN     "kunyomi" TEXT[],
ADD COLUMN     "levels" TEXT[],
ADD COLUMN     "meanings" TEXT[],
ADD COLUMN     "onyomi" TEXT[],
ADD COLUMN     "radicals" TEXT[];
