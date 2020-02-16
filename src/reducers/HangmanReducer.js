import {getRandomInt } from '../Utils';
import words from '../data/words';
import {HangmanActions} from '../Actions';

export const GUESS_STATE = {
  GUESSING: "guessing",
  FOUND_IT: "foundIt",
  FAILED: "failed",
}

const A = 65;
const Z = 90;

const MAX_NUM_MISTAKES = 10;


const restart = () => {
  let wordToGuess = words[getRandomInt(words.length)];
  wordToGuess = wordToGuess.split("").map(chr => ({chr, isFound: false}));

  const charactersToGuessFrom = [];
  for (let chr = A; chr <= Z; ++chr)
    charactersToGuessFrom.push(String.fromCharCode(chr));

  return {
    wordToGuess,
    charactersToGuessFrom,
    unsuccessfulCharacters: [],
    guessState: GUESS_STATE.GUESSING,
  }
}

const guessCharacter = (state, action) => {
  const charactersToGuessFrom = state.charactersToGuessFrom.filter(chr => chr !== action.chr);
  let wordToGuess = state.wordToGuess;
  let unsuccessfulCharacters = state.unsuccessfulCharacters;
  let guessState = state.guessState;

  let isFoundInWord = false;
  let isWholeWordFound = true;
  state.wordToGuess.forEach(chrState => {
    if (chrState.chr === action.chr)
      isFoundInWord = true;
    else if (!chrState.isFound)
      isWholeWordFound = false;
  });

  if (isFoundInWord) {
    wordToGuess = wordToGuess.map(chrState => (
      {...chrState, isFound: chrState.isFound || chrState.chr === action.chr})
    );
  }
  else {
    unsuccessfulCharacters = unsuccessfulCharacters.slice();
    unsuccessfulCharacters.push(action.chr);
  }

  if (isWholeWordFound) {
    guessState = GUESS_STATE.FOUND_IT;
  }
  else if (unsuccessfulCharacters.length === MAX_NUM_MISTAKES) {
    guessState = GUESS_STATE.FAILED;
    wordToGuess = wordToGuess.map(chrState => ({...chrState, isFound: true}));
  }

  return {...state, charactersToGuessFrom, wordToGuess, unsuccessfulCharacters, guessState};
}

const hangmanReducer = (
  state = {
    wordToGuess: [],
    charactersToGuessFrom: [],
    unsuccessfulCharacters: [],
    guessState: GUESS_STATE.GUESSING,
  },
  action) => {

  switch (action.type) {
    case HangmanActions.RESTART:
      return restart();

    case HangmanActions.GUESS_CHARACTER:
        return guessCharacter(state, action);

    default:
      return state;
  }
}

export default hangmanReducer;
