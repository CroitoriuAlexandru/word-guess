let gameViewProgrss = document.getElementById("gameViewProgrss");
let testWordBtn = document.getElementById("testWord");
let inputField = document.getElementById("inputField");
let startBtn = document.getElementById("startBtn");
let alphabet = document.getElementById("alphabet");
let gameDisplay = document.getElementById("gameDisplay");
let wordGuessPane = document.getElementById("wordGuessPane");
let word;
let gameViewProgrssClasses = [
  "bg-dark",
  "bg-danger",
  "bg-warning",
  "bg-info",
  "bg-primary",
  "bg-success",
];
let loseCount = 5;
let winCount;

// checks if input is empthy
function checkInput() {
  gameDisplay.innerHTML = "";
  if (inputField.value === "") {
    return true;
  } else {
    return false;
  }
}
// this function creates a string of 12 char and places the input text in the middle
function concatWord() {
  word = inputField.value.toUpperCase();
  winCount = word.length;
  for (
    let wordLength = word.length, startToEndZero = true;
    wordLength < 12;
    ++wordLength
  ) {
    if (startToEndZero) {
      startToEndZero = false;
      word = "0" + word;
    } else {
      startToEndZero = true;
      word += "0";
    }
  }
}
// generates alphabet buttons for input
function generateAlphabet() {
  for (let i = 0, letter = "A"; i < 25; ++i) {
    alphabet.innerHTML +=
      `<button class="btn col col-1 m-1 p-0 border border-5" id="` +
      letter +
      `" onclick="checkLetterInWord(this.id)">` +
      letter +
      `</button>`;
    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
  }
}
// generates the word fields and creates an array containing all the fields elements
function generateFields() {
  for (let i = 0; i < 12; ++i) {
    if (word[i] === "0") {
      wordGuessPane.innerHTML +=
        `<div class="col word-cell bg-secondary" id="` + i + `"></div>`;
    } else {
      wordGuessPane.innerHTML +=
        `<div class="col word-cell" id="` + i + `"></div>`;
    }
  }
}
// this is the brain, usses all other functions to get ready for the game, create the sistem and the playground :)
function startGame() {
  if (checkInput()) {
    gameDisplay.innerHTML += `<div class="alert alert-success">
    You need to enter at least a character so the game can start
  </div>
  <div class="alert alert-success">
    Or try to push the test word button and a word is goin to be inputed and start the game, i'll give you a hint, the word goes like this "abc......ij" 
  </div>`;
    return;
  }
  testWordBtn.disabled = true;
  gameDisplay.innerHTML = "";
  concatWord();
  inputField.disabled = true;
  generateAlphabet();
  generateFields();
  inputField.value = "";
  startBtn.disabled = true;
}
// this gets called by test word. it starts the game with a input field of "abcdefghij"
function appendWord() {
  inputField.value = "abcdefghij";
  startGame();
}
// here i handle the game end display and append the restart button so that the game can pe reseted
function gameEnds() {
  for (let i = 0; i < 25; ++i) {
    alphabet.children[i].disabled = true;
  }
  gameDisplay.innerHTML = `<button
  class="btn btn-info mb-2"
  id="restartGameBtn"
  onclick="restartGame()"
>
  Restart Game
</button>`;
  if (winCount === 0) {
    gameDisplay.innerHTML += `<div class="alert alert-success">
      you have guessed the word and won your friends trust
    </div>`;
  } else if (loseCount === 0) {
    gameDisplay.innerHTML += `<div class="alert alert-danger">
      you have lost this round but no worries, just restart and try again
    </div>`;
  }
}
// letter buttons call this function to check if the letter is in the word
function checkLetterInWord(letter) {
  document.getElementById(letter).disabled = true;
  let wordCheck = true;
  for (let i = 0; i < 12; ++i) {
    if (letter === word[i]) {
      --winCount;
      wordCheck = false;
      document.getElementById(i).innerHTML = letter;
    }
  }
  if (wordCheck) {
    gameViewProgrss.classList.remove(gameViewProgrssClasses[loseCount]);
    gameViewProgrss.classList.add(gameViewProgrssClasses[loseCount - 1]);
    --loseCount;
    gameViewProgrss.children[1].innerHTML = loseCount;
  }
  if (winCount == 0 || loseCount == 0) {
    gameEnds();
  }
}
// resets everithing
function restartGame() {
  gameViewProgrss.children[1].innerHTML = "5";
  gameViewProgrss.classList.remove("bg-dark");
  gameViewProgrss.classList.add("bg-success");
  alphabet.innerHTML = "";
  testWordBtn.disabled = false;
  startBtn.disabled = false;
  inputField.disabled = false;
  wordGuessPane.innerHTML = "";
  gameDisplay.innerHTML = "";
  loseCount = 5;
}
