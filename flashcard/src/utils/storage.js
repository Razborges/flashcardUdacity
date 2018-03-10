import { AsyncStorage } from 'react-native';
import { keys } from './constants';

export function getDecks(){
  return AsyncStorage.getItem(keys.STORAGE_KEY)
    .then(dbJSON => {
      if(!dbJSON){
        return {}
      }
      return JSON.parse(dbJSON)
    })
}

export function getDeck(id){
  return getDecks()
    .then(decks => decks[id])
}

export function saveDeckTitle(title){
  return AsyncStorage.mergeItem(keys.STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, question){
  return getDecks()
    .then(decks => {
      decks[title].questions.push(question)
      return AsyncStorage.setItem(keys.STORAGE_KEY, JSON.stringify(decks))
    })
}
