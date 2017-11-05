import { AsyncStorage } from 'react-native';
export const STORAGE_KEY = 'MOBILEFLASHCARDKEY';

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [deck.title]: deck,
  }));
}
export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(res => JSON.parse(res));
}

export function addCardToDeck(title, card) {
  return getDecks()
  .then( decks => {
    decks[title].questions.push(card);
     AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks));
  });
}

export function clear() {
  return AsyncStorage.clear(STORAGE_KEY);
}
