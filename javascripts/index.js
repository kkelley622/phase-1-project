
const mainDiv = () => document.getElementById("main");

function resetMainDiv() {
    mainDiv().innerHTML = ""
} 

const wordOfDay = () => document.getElementById("word-of-day-link")

function renderWordOfDayForm() {
    resetMainDiv();
    
    const h1 = document.createElement("h1");

    const form = document.createElement("form")
    form.setAttribute('method', "post");
    form.setAttribute('action', "submit.php")

    h1.innerText = "Previous Guesses"
    h1.style.margintop = "0"
    
    mainDiv().appendChild(h1)
    renderLastGuesses();
} 

const previousGuess = () => document.getElementById("previousGuess") 

let lastGuess = []; 

const renderLastGuess = (lastGuess, ul) => {
    const li = document.createElement("li");
    li.innerText = lastGuess.lastGuess;
    ul.appendChild(li);
} // 

const renderLastGuesses = () => {
    const ul = document.createElement("ul");
    lastGuess.forEach(lastGuess => renderLastGuess(lastGuess, ul))
    mainDiv().appendChild(ul)

} // 





function renderPreviousGuesses() { 
    p2.innerText = guess
}


function attachWordOfDayEvent() {
    wordOfDay().addEventListener("click", renderWordOfDayForm)
}


const wordleSpinoff = () => document.getElementById("wordle-spinoff")

function attachWordleSpinoffClickEvent() {
    wordleSpinoff().addEventListener("click", renderHomePage)
}

function renderHomePage() {
    
    resetMainDiv();

    const h1 = document.createElement("h1");
    h1.style.margintop = "0"
    const p = document.createElement("p");

    h1.innerText = "Kevin's Word Guessing Game Homepage"
    p.innerText = "Guess the five letter word of the day! If a letter is in the word of the day, but in the wrong spot, it will populate under present letters. If a guessed letter is not in the correct word at all, it will populate under absent letters. And if a guessed letter is in the correct place in the daily word, it will populate under correct letters. Click the Your Previous Guesses tab to see which words have already been guessed."

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
}


























async function guessDailyWord(guessWord) {
    const response = await fetch (`https://v1.wordle.k2bd.dev/daily?guess=${guessWord}`, {
        method: 'GET'
    })
    const awaitResponse = await response.json()
    return awaitResponse
}





const form = document.getElementById("guess-form") 

form.onsubmit = async function (event) {
    event.preventDefault()

    const guess = form.guess.value 
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
    const response = await guessDailyWord(guess)
    console.log("response", response[0].result)
    
    let incorrectLetters = 0 

    
    response.map((letter) => {
        if(letter.result === "present" || letter.result === "absent") incorrectLetters += 1
        const presentLetters = document.getElementById("presentLettersP")
        const absentLetters = document.getElementById("absentLettersP")
        const correctLetters = document.getElementById("correctLettersP")

        presentLetters.innerText += `${letter.result === "present" ? ` ${letter.guess}` : ""}`
        absentLetters.innerText += `${letter.result === "absent" ? ` ${letter.guess}` : ""}`
        correctLetters.innerText += `${letter.result === "correct" ? ` ${letter.guess}` : ""}`
    })  
    
    const guessStatus = document.getElementById("guessStatus")

    const isCorrect = incorrectLetters === 0 
    guessStatus.innerText = `${guess}: ${isCorrect ? "Good Job" : "Guess Again"}`
    
    pushToGuessList();
    
}



const fetchGuessList = () => {
    fetch("http://localhost:3000/guesses")
    .then(resp => resp.json())
    .then(data => lastGuess = data)
}

// DOM Content Loaded Event Listener
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    attachWordOfDayEvent();
    fetchGuessList();
    attachWordleSpinoffClickEvent();
    guessDailyWord();
})

// return the items that have a price less than 5 dollars: 
const items = [{label: "milk", price: 2}, {label: "banana", price: 10}, {label: "ice cubes", price: 1}]

const filteredItems = items.filter(item => item.price < 5);

// when a user clicks add items, all of those filtered items added to items container

// select button from DOM and assign it to a variable X
const addItemButton = document.getElementById("addItem");
// add an event listener on the button listening for a click event
addItemButton.addEventListener("click", addItems);

function addItems () {
   // in the callback for the event listener add the items to item container
    // declare a variable for items container
    const itemsContainer = [];
    // forEach item in filteredItems add to item container
    filteredItems.forEach(element => itemsContainer.push(element))
    console.log("items container", itemsContainer)
    console.log("clicked")
}