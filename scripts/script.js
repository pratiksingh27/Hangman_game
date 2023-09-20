const keyboardDiv = document.querySelector(".keyboard");
const wordDispaly = document.querySelector(".word-display");
const guessedText = document.querySelector(".guessed-text b");
const hangemanImg= document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const palyAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount;
const maxCount =6;

const resetGame = () => {
    //resetting game
    correctLetters =[];
    wrongGuessCount =0;
    hangemanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    guessedText.innerHTML = `${wrongGuessCount} / ${maxCount}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDispaly.innerHTML =currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}

const getRandomWord = () =>{
    //selecting a randomword and hint from word list
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord =word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
   /*  wordDispaly.innerHTML =word.split("").map(() => `<li class="letter"></li>`).join(""); */
}

const gameOver = (isVictory) =>{
    //after 600ms of game complete.. showing model with relevent detials
   setTimeout(() => {
    const modelText = isVictory ? `You Found the word: ` : 'the correct word was: ';
    gameModel.querySelector("img").src=`images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModel.querySelector("h4").innerText=`${isVictory ? 'congrats' : 'Game Over'}`;
    gameModel.querySelector("p").innerHTML=`${modelText} <b>${currentWord}</b>`;
    gameModel.classList.add("show");
   }, 300);
}

const initGame = (button, clickedLetter) =>{
    // console.log(button, clickedLetter);

    //checking word is present or not
    if(currentWord.includes(clickedLetter)){
        // console.log(clickedLetter, "is exist on word");
        [...currentWord].forEach((letter, index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDispaly.querySelectorAll("li")[index].innerHTML = letter;
                wordDispaly.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        // console.log(clickedLetter, "not exist");
        wrongGuessCount++;
        hangemanImg.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled =true;
    guessedText.innerHTML = `${wrongGuessCount} / ${maxCount}`;

    //calling gameover function if any of this condition meets
    if(wrongGuessCount === maxCount) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

//creating keyboard button
for(let i=97;i<123; i++){
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    // console.log(String.fromCharCode(i));
}

getRandomWord();
palyAgainBtn.addEventListener("click", getRandomWord);