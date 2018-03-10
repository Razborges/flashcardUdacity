import { ActionType } from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case ActionType.LOADING_DECKS:
      return { ...state, ...action.decks }

    case ActionType.UPDATE_DECK:
      return { ...state, ...action.updatedDeck }
      
    default:
      return state
  }
}

export default decks
