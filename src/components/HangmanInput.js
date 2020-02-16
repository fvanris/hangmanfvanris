import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './HangmanInput.css';
import {hangmanGuessCharacter, hangmanRestart} from '../Actions';
import {GUESS_STATE} from "../reducers/HangmanReducer";


const HangmanpInput = () => {
  const dispatch = useDispatch();
  const wordToGuess = useSelector(state => state.wordToGuess);
  const charactersToGuessFrom = useSelector(state => state.charactersToGuessFrom);
  const unsuccessfulCharacters = useSelector(state => state.unsuccessfulCharacters);
  const guessState = useSelector(state => state.guessState);

  const selectChrRef = useRef();

  const onSelectClick = () => {
    const selectChr = selectChrRef.current;
    const chr = selectChr.options[selectChr.selectedIndex].text;
    dispatch(hangmanGuessCharacter(chr));
    selectChr.selectedIndex = 0;
  }

  const onRestartClick = () => dispatch(hangmanRestart());

  return (
    <div className="hangmanInputContainer">
      <div className="hangmanInput">
        <h2>Guess the word</h2>

        <div id="wordToGuessContainer">
          {wordToGuess.map((chrState, idx) =>
            <span className="guessChr" key={idx}>{chrState.isFound ? chrState.chr : "\u00a0"}</span>)}
        </div>

        {guessState === GUESS_STATE.GUESSING && (
          <div className="inputContainer">
            <span id="selectText">Select character:</span>
            <select id="selectChr" ref={selectChrRef}>
              {charactersToGuessFrom.map((chr, idx) => <option key={idx}>{chr}</option>)}
            </select>
            <button className="hangmanButton" onClick={onSelectClick}>Select</button>
          </div>)}

        {unsuccessfulCharacters.length > 0 && (
          <div className="inputContainer">
            Wrong characters:
            <div>
              {unsuccessfulCharacters.map((chr, idx) => <span className="wrongChr" key={idx}>{chr}</span> )}
            </div>
          </div>)}

        {guessState === GUESS_STATE.FOUND_IT && (
          <div className="resultText">SUCCESS!!</div>
        )}
        {guessState === GUESS_STATE.FAILED && (
          <div className="resultText">FAILED!!</div>
        )}
        {(guessState === GUESS_STATE.FOUND_IT || guessState === GUESS_STATE.FAILED) && (
          <button className="hangmanButton" onClick={onRestartClick}>Restart</button>)}
      </div>
    </div>
  );
};

export default HangmanpInput;


