'use strict';

/* 
    Overall Idea:
        Click the Wordle Spinooff link

    When: DOMContentLoaded (event)

    Cause: click

    Effect: return to the homepage

*/
// Node Getters
const mainDiv = () => document.getElementById("main");
const wordOfDay = () => document.getElementById("word-of-day-link")
const randomWord = () => document.getElementById("random-word")
const wordleSpinoff = () => document.getElementById("wordle-spinoff")
const previousGuess = () => document.getElementById("previousGuess")
const form = document.getElementById("guess-form")

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
    p.innerText = "Guess the five letter word of the day, or a random five letter word!"

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}

// Function to render ord of the day page on click
function renderWordOfDayForm() {
    resetMainDiv();

    // create the html elements of the word of the day page
    const h1 = document.createElement("h1");
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    const form = document.createElement("form")
    form.setAttribute('method', "post");
    form.setAttribute('action', "submit.php")

    h1.innerText = "Word of the Day"
    h1.style.margintop = "0"
    
    li.innerText = "Guess today's five letter word"
    
    ul.appendChild(li);

    mainDiv().appendChild(h1)
    mainDiv().appendChild(ul)
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

// display guess under form
function renderPreviousGuesses() {
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
// guessDailyWord()



// Submitting our guess form

form.onsubmit = async function (event) {
    event.preventDefault()
    // setting the value of our guess to a variable
    const guess = form.guess.value
    console.log("guess", guess)
    // using our guess variable as the parameter in guessDailyWord function and setting to the variable response
    const response = await guessDailyWord(guess)
    console.log("response", response[0].result)
    // creating a new variable which we will use to store if there are any incorrect letters in the guess
    let incorrectLetters = 0
    // map through the letters in our guess and determine if the letter is present or absent. if present or absent add 1 to our incorrect letters variable
    response.map((letter) => {if(letter.result === "present" || letter.result === "absent")
        incorrectLetters += 1})
    // const isGuessCorrect = response.filter((letter) => {console.log(letter.result, letter.result === "correct")})
    // incorrectLetters = 0
    // setting the correct div of the html to a variable where we will display if the guess was correct or not
    const correctGuess = document.getElementById("correct")
    // setting the value of isCorrect to be incorrectLetters with a value of 0
    const isCorrect = incorrectLetters === 0
    // using a ternary to display different text depending on wheter or not there are any incorrect letters in our guess
    correctGuess.innerText = `${guess}: ${isCorrect ? "Good Job" : "Guess Again"}`
    
}

// response.forEach(element)
// DOM Content Loaded

document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    attachWordOfDayEvent();
    // attachRandomWordEvent();
    attachWordleSpinoffClickEvent();
})