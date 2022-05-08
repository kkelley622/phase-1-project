/* 
    Overall Idea:
        Click the word of the day link and view form to submit word guess

    When: DOMContentLoaded (event)

    Cause: click

    Effect: render a blank form

*/
// Node Getters
const mainDiv = () => document.getElementById("main");
const wordOfDay = () => document.getElementById("word-of-day-link")

// Event Listeners
function attachWordOfDayEvent() {
    wordOfDay().addEventListener("click", renderWordOfDayForm)
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


// Helpers
function resetMainDiv() {
    mainDiv().innerHTML = ""
}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
    attachWordOfDayEvent();
})