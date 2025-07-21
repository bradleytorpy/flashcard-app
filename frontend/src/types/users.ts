import { Deck } from "./decks";

export interface User {
    username: string;
    decks: Deck[] | null;
};