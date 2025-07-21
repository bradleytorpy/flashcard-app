import { Flashcard } from "./flashcards";

export interface Deck {
    id: number;
    name: string;
    createdAt: Date;
    userId: number;
    flashcards: Flashcard[];
};