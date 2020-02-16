import React from 'react';
import {useSelector} from 'react-redux';
import { Hangman } from './components';
import HangmanInput from './components/HangmanInput';


import './App.css';

const App = () => {
  const unsuccessfulCharacters = useSelector(state => state.unsuccessfulCharacters);

  return (
    <div className="App">
      <div className="container">
        <h1>React Hangman</h1>
        <div className="hangmanContainer">
          <Hangman incorrectGuessCount={unsuccessfulCharacters.length}/>
          <HangmanInput/>
        </div>
      </div>
    </div>
  );
};

export default App;
