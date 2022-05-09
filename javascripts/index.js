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

// Event Listeners
function attachWordOfDayEvent() {
    wordOfDay().addEventListener("click", renderWordOfDayForm)
}

function attachRandomWordEvent() {
    randomWord().addEventListener("click", renderRandomWordForm)
}

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
    p.innerText = "Guess the four letter word of the day, or a random four letter word!"

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}

function renderWordOfDayForm() {
    resetMainDiv();

    const h1 = document.createElement("h1");
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    h1.innerText = "Word of the Day"
    h1.style.margintop = "0"
    
    li.innerText = "Guess today's four letter word"
    
    ul.appendChild(li);

    mainDiv().appendChild(h1)
    mainDiv().appendChild(ul)
}

function renderRandomWordForm() {
    resetMainDiv();

    const h1 = document.createElement("h1");
    const li = document.createElement("li");
    const ul = document.createElement("ul");

    h1.innerText = "Random Word"
    h1.style.margintop = "0"
    
    li.innerText = "Guess any random four letter word"
    
    ul.appendChild(li);

    mainDiv().appendChild(h1)
    mainDiv().appendChild(ul)


}


// Helpers
function resetMainDiv() {
    mainDiv().innerHTML = ""
}

async function guessDailyWord(guessWord) {
    const response = await fetch (`https://v1.wordle.k2bd.dev/daily?guess=${guessWord}`, {
        method: 'GET'
    })
    const awaitResponse = await response.json()
    return awaitResponse
}
// guessDailyWord()

const form = document.getElementById("guess-form")

form.onsubmit = async function (event) {
    event.preventDefault()
    const guess = form.guess.value
    console.log("guess", guess)
    const response = await guessDailyWord(guess)
    console.log("response", response)
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    attachWordOfDayEvent();
    attachRandomWordEvent();
    attachWordleSpinoffClickEvent();
})