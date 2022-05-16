# Kevin's Word Guessing Game

## Introduction

This app simply allows users to guess a daily five letter word. The daily word changes everyday through the public API linked in the JavaScript. 

## Instructions

- open index.html in the web browser

- run "json-server --watch db.json" in the terminal

- submit your five letter word in the submit form

- if any letter of your word is present in the daily word, but not in the correct spot, that letter will populate under "present letters"

- if any letter of the submitted word is not in the daily word at all, it will populate under "absent letters"

- if any letter of the submitted word is present and in the correct spot in the daily word, it will populate under "correct letters"

- if the submitted word does not match the daily word, the submitted word along with the message "Guess Again" will appear under "Previous Guess"

- if the submitted word matches the daily word, the submitted word along with the message "Good Job" will appear under "Previous Guess"

- Users can view which words they have previously guess by clicking on the "Your Previous Guesses" tab

### Requirements
* Have json-server installed

### Installation Instructions (How to use)
* Fork and clone
* Run json server for db.json
* Open index.html in the browser

### Conclusion

This single page web app works similarly to the popular game Wordle. The user guesses a random five letter word and receives feedback on which letters are correct. The user has an unlimited number of guesses. Once the user has guessed the correct word, they are alerted with the word and the message "Good Job"

### Acknowledgements
* Public API used for the daily word: https://v1.wordle.k2bd.dev/redoc
* Debugging and guidance provided by Kelli Budd