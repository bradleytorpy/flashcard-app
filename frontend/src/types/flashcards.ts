import { Deck } from "./decks";

export interface Flashcard {
    id: number;
    kanji: string;
    onyomi: string[];
    kunyomi: string[];
    meanings: string[];
    levels: string[];
    radicals: string[];
    createdAt: Date;
    deckId: number | null;
    decks: Deck[] | null;
};