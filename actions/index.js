import { GET_DECKS, ADD_DECK, ADD_QUESTION } from './types';
import { saveDeckTitle, getDecks , addCardToDeck} from '../utils/api';


export const getDecksFromStorage = () => {
  return (dispatch) => {
    getDecks().then(decks => {getDecksFromStorageAction(dispatch, decks)})
  };
};

const getDecksFromStorageAction = (dispatch, decks) => {
  dispatch({
    type: GET_DECKS,
    decks
  });
}

export const addDeckToStorage = (title) => {
  return (dispatch) => {
    const deck = { title, questions: []};
    addDeckToStorageAction(dispatch, deck);
    saveDeckTitle(deck)
  };
};

const addDeckToStorageAction = (dispatch, deck) => {
  dispatch({
    type: ADD_DECK,
    deck
  });
}

export const addQuestionToStorage = (title, question, answer) => {
  return (dispatch) => {
    const card = {
      question,
      answer
    };
   addQuestionToStorageAction(dispatch, title, card);
   addCardToDeck(title, card)
 };
};

const addQuestionToStorageAction = (dispatch, title, card) => {
  dispatch({
    type: ADD_QUESTION,
    title,
    card
  });
}
