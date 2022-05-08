/* 
    Overall Idea:
        Load the page and view the homepage

    When: DOMContentLoaded (event)

    Cause: DOMContentLoaded (event)

    Effect: Display the Homepage

*/

const mainDiv = () => document.getElementById("main");

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

function resetMainDiv() {
    mainDiv().innerHTML = ""
}

document.addEventListener("DOMContentLoaded", () => {
    renderHomePage();
})