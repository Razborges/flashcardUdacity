export const ActionType = {
  LOADING_DECKS: 'LOADING_DECKS',
  UPDATE_DECK: 'UPDATE_DECK'
}

export const loadingDecks = (decks) => ({ type: ActionType.LOADING_DECKS, decks });

export const updateDeck = (deck) => ({ type: ActionType.UPDATE_DECK, updatedDeck: { [deck.title]: deck } });

export const newDeck = (title) => {
  const deck = {
    title,
    questions: [],
  }

  return updateDeck(deck);
};
