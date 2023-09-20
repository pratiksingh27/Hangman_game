const keyboardDiv = document.querySelector(".keyboard");
const wordDispaly = document.querySelector(".word-display");
const guessedText = document.querySelector(".guessed-text b");
const hangemanImg= document.querySelector(".hangman-box img")

let currentWord, wrongGuessCount =0;
const maxCount =6;

const getRandomWord = () =>{
    //selecting a randomword and hint from word list
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(word);
    currentWord =word;
    document.querySelector(".hint-text b").innerText = hint;
    wordDispaly.innerHTML =word.split("").map(() => `<li class="letter"></li>`).join("");
}

const initGame = (button, clickedLetter) =>{
    // console.log(button, clickedLetter);

    //checking word is present or not
    if(currentWord.includes(clickedLetter)){
        // console.log(clickedLetter, "is exist on word");
        [...currentWord].forEach((letter, index)=>{
            if(letter === clickedLetter){
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
}

//creating keyboard button
for(let i=97;i<122; i++){
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
    // console.log(String.fromCharCode(i));
}

getRandomWord();