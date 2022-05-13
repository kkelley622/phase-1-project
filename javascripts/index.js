
// Node Getters
const mainDiv = () => document.getElementById("main");
const wordOfDay = () => document.getElementById("word-of-day-link")
const randomWord = () => document.getElementById("random-word")
const wordleSpinoff = () => document.getElementById("wordle-spinoff")
const previousGuess = () => document.getElementById("previousGuess")


let lastGuess = [];


// Event Listeners
function attachWordOfDayEvent() {
    wordOfDay().addEventListener("click", renderWordOfDayForm)
}

// function attachRandomWordEvent() {
//     randomWord().addEventListener("click", renderRandomWordForm)
// }

function attachWordleSpinoffClickEvent() {
    wordleSpinoff().addEventListener("click", renderHomePage)
}




// Event Handlers
function renderHomePage() {
    // create the html elements of the home page
    resetMainDiv();

    const h1 = document.createElement("h1");
    h1.style.margintop = "0"
    const p = document.createElement("p");

    h1.innerText = "Kevin's Word Guessing Game Homepage"
    p.innerText = "Guess the five letter word of the day! If a letter is in the word of the day, but in the wrong spot, it will populate under present letters. If a guessed letter is not in the correct word at all, it will populate under absent letters. And if a guessed letter is in the correct place in the daily word, it will populate under correct letters. Click the Your Previous Guesses tab to see which words have already been guessed."

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}

// Function to render ord of the day page on click
function renderWordOfDayForm() {
    resetMainDiv();
    
    // create the html elements of the word of the day page
    const h1 = document.createElement("h1");

    const form = document.createElement("form")
    form.setAttribute('method', "post");
    form.setAttribute('action', "submit.php")

    h1.innerText = "Previous Guesses"
    h1.style.margintop = "0"
    
    mainDiv().appendChild(h1)
    renderLastGuesses();
}

const renderLastGuesses = () => {
    const ul = document.createElement("ul");
    lastGuess.forEach(lastGuess => renderLastGuess(lastGuess, ul))
    mainDiv().appendChild(ul)

}

const renderLastGuess = (lastGuess, ul) => {
    const li = document.createElement("li");
    li.innerText = lastGuess.lastGuess
    ul.appendChild(li);
}

// function renderRandomWordForm() {
//     resetMainDiv();

//     const h1 = document.createElement("h1");
//     const li = document.createElement("li");
//     const ul = document.createElement("ul");

//     h1.innerText = "Random Word"
//     h1.style.margintop = "0"
    
//     li.innerText = "Guess any random four letter word"
    
//     ul.appendChild(li);

//     mainDiv().appendChild(h1)
//     mainDiv().appendChild(ul)


// }

function renderPreviousGuesses() {  // display user's guess in p2 under the submit form
    p2.innerText = guess
}


// Helpers
function resetMainDiv() {
    mainDiv().innerHTML = ""
}



// Fetching API and returning word of the day
async function guessDailyWord(guessWord) {
    const response = await fetch (`https://v1.wordle.k2bd.dev/daily?guess=${guessWord}`, {
        method: 'GET'
    })
    const awaitResponse = await response.json()
    return awaitResponse
}





const form = document.getElementById("guess-form")  // assigning the form to a variable 

// Submitting our guess form
form.onsubmit = async function (event) {
    event.preventDefault()

    const guess = form.guess.value  // setting the value of our guess to a variable
    console.log("guess", guess)
    const pushToGuessList = () => {
        fetch('http://localhost:3000/guesses', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({lastGuess: guess})
    })
    .then(resp => resp.json())
    .then(data => {
        lastGuess.push(data);
    })
    }
    const response = await guessDailyWord(guess)  // using our guess variable as the parameter in guessDailyWord function and setting to the variable response
    console.log("response", response[0].result)
    
    let incorrectLetters = 0  // creating a new variable to store number of incorrect letters

    
    response.map((letter) => {
        if(letter.result === "present" || letter.result === "absent") incorrectLetters += 1
        const presentLetters = document.getElementById("presentLettersP")
        const absentLetters = document.getElementById("absentLettersP")
        const correctLetters = document.getElementById("correctLettersP")

        presentLetters.innerText += `${letter.result === "present" ? ` ${letter.guess}` : ""}`
        absentLetters.innerText += `${letter.result === "absent" ? ` ${letter.guess}` : ""}`
        correctLetters.innerText += `${letter.result === "correct" ? ` ${letter.guess}` : ""}`
    })  // map through the letters of guess, determine if the letter is present or absent. if present or absent + 1 to incorrect letters
    // incorrectLetters = 0
    const guessStatus = document.getElementById("guessStatus")  // assign div of guessStatus to variable guessStatus

    const isCorrect = incorrectLetters === 0  // the value of isCorrect assigned incorrectLetters with a value of 0
    guessStatus.innerText = `${guess}: ${isCorrect ? "Good Job" : "Guess Again"}`  // using a ternary to display different text depending on wheter or not there are any incorrect letters in our guess
    
    pushToGuessList();
    
}

// using db.json

const fetchGuessList = () => {
    fetch("http://localhost:3000/guesses")
    .then(resp => resp.json())
    .then(data => lastGuess = data)
}

// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    attachWordOfDayEvent();
    // attachRandomWordEvent();
    fetchGuessList();
    attachWordleSpinoffClickEvent();
})