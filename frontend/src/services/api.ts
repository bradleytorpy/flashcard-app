const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const api = {
  baseURL: API_BASE_URL,
  
  getFlashcards: () => fetch(`${API_BASE_URL}/flashcards`),
  getFlashcard: (id: string) => fetch(`${API_BASE_URL}/flashcards/${id}`),

  getDecks: () => fetch(`${API_BASE_URL}/decks`),
  getDeck: (id: string) => fetch(`${API_BASE_URL}/decks/${id}`),
};