/*----- constants -----*/
const COLORS = [
    'var(--red)', 
    'var(--orange)',
    'var(--yellow)',
    'var(--green)',
    'var(--blue)',
    'var(--purple)',
    'var(--indigo)',
    'var(--brown)',
]
const SECRET_SLOTS =[1, 2, 3, 4];
const MAX_WRONG_GUESSES = 10;
const board = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10:[]
}
/*----- app's state (variables) -----*/
let secrets = []; //Array to hold randomly selected colors
let gameStatus; //true: game in play, false: secret revealed
let currentChoices = [];
let wrongGuesses = [];
/*----- cached element references -----*/
const secretEls = [...document.querySelectorAll('#secret > div')];
const rowEls = [...document.querySelectorAll('.guess')].reverse(); //returns all 10 guess rows 
const bankColors = [...document.querySelectorAll('#bank > div')];
const guessEls = [...document.querySelectorAll('.guess > .dropzone')];
const checkBtn = document.getElementById('check');
// const feedbackEls = document.querySelectorAll('.f > div');
//TODO: cache the messageEl to declare win or loss

/*----- event listeners -----*/
document.getElementById('bank').addEventListener('click', storeBankClick);
/*----- functions -----*/
init();

function init() {
    generateSecret(); //Step 1. Done
    check();
    render();
};

function generateSecret() { //For Step 1. Done
    SECRET_SLOTS.map(function(){
        return secrets.push(COLORS[Math.floor(Math.random() * COLORS.length)])
    })
}
function render() {
    renderSecret(); //For Step 1A. Done
      //Render Check Button  checkBtn.style.visibility = currentChoice === 4 ? 'visible' : 'hidden';

}

function renderSecret(){ //For step 1A. Done.
    secretEls.forEach(function(div, idx) {
      div.style.backgroundColor = secrets[idx];
    })
};
function storeBankClick(evt, idx) { //For Step 2a. Done
    //guards
    if (evt.target === document.querySelector('section')) {
        return
    }
    if (currentChoices.length === SECRET_SLOTS.length) {
        currentChoices.length = 0;
    }
    return currentChoices.push(evt.target);
}
function check() {
    currentChoices.map(function () {
    })
}
