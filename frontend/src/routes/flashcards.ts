import { get, post, del } from '../api/client';
import type { Flashcard } from '../types/flashcards';

export const getAllFlashcards = () => get<Flashcard[]>('/flashcards');
export const getFlashcardById = (id: number) => get<Flashcard>(`/flashcards/${id}`);
export const createFlashcard = (data: Partial<Flashcard>) => post<Flashcard>('/flashcards', data);
export const deleteFlashcard = (id: number) => del(`/flashcards/${id}`);