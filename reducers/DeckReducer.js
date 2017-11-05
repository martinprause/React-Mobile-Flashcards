import { GET_DECKS, ADD_DECK, ADD_QUESTION } from '../actions/types';

const INITIAL_STATE = {
  decks: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DECKS:
      return { ...state,
        decks: action.decks
      };
    case ADD_DECK:
      return { ...state,
        decks: {
          ...state['decks'],
          [action.deck.title]: action.deck
        }
      };
    case ADD_QUESTION:
      const questions = state['decks'][action.title]['questions'];
      questions.push(action.card);
      return { ...state,
        decks: {
        ...state['decks'],
        [action.title]: {
        ...state['decks'][action.title],
        questions: questions
        }
       }
     };
    default:
        return state;
    }
  }