
export const HangmanActions = {
  RESTART: "hangmanRestart",
  GUESS_CHARACTER: "hangmanGuessCharacter",
}

export const hangmanRestart = () => {
  return {
    type: HangmanActions.RESTART,
  }
}

export const hangmanGuessCharacter = (chr) => {
  return {
    type: HangmanActions.GUESS_CHARACTER,
    chr,
  }
}