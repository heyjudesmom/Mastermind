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

/*----- app's state (variables) -----*/
let secrets = []; //Array to hold randomly selected colors
let gameStatus; //true: game in play, false: secret revealed
let currentChoices = [];//Array to hold bank choices for row
let rows = [{slot1: '', slot2: '', slot3: '', slot4: ''}];//
let pegs = [];
/*----- cached element references -----*/
const secretEls = [...document.querySelectorAll('#secret > div')];
const rowEls = [...document.querySelectorAll('.guess > .dropzone')]; //returns all 10 guess rows 
const bankEls = [...document.querySelectorAll('#bank > div')];
bankEls.forEach(function(div, idx) {
    div.style.backgroundColor = COLORS[idx]
});
const checkBtn = document.getElementById('check');
const feedbackEls = document.querySelectorAll('.f > div');
const playBtn = document.getElementById('play');
//TODO: cache the messageEl to declare win or loss

/*----- event listeners -----*/
document.getElementById('bank').addEventListener('click', storeBankClicks);
document.getElementById('check').addEventListener('click', handleCheck);
document.getElementById('play').addEventListener('click', handlePlay);
/*----- functions -----*/
init();

function init() {
    gameStatus = true;
    generateSecret(); //Step 1. Done
    render();
};

function generateSecret() { //For Step 1. Done
    SECRET_SLOTS.map(function(){
        return secrets.push(COLORS[Math.floor(Math.random() * COLORS.length)])
    })
}
function render() {
    renderSecret(); //For Step 1A. Done
    renderBankClicks();
    renderCheckBtn();
}

function renderCheckBtn() {
    checkBtn.style.visibility = currentChoices.length === 4 ? 'visible' : 'hidden';
}
function renderBankClicks() {
    //guards
    rowEls.forEach(function(div, idx) {
        div.style.backgroundColor = currentChoices[idx];
})
}

function renderSecret(){ //For step 1A. Done.
    secretEls.forEach(function(div, idx) {
      div.style.backgroundColor = secrets[idx];
    })
};
function storeBankClicks(evt) { //For Step 2a. Done
    //guards
    
    if (evt.target === document.querySelector('section')) {
        return
    }
    if (currentChoices.length === SECRET_SLOTS.length) {
        currentChoices = []
        rowEls.forEach(function(div) {
            div.style.backgroundColor = null;
          })
    }
    currentChoices.push(evt.target.style.backgroundColor);
    render();
}
function handleCheck() {
    if (currentChoices.toString() === secrets.toString()){
     console.log('hello');
     gameStatus = false;
     render();
    } else if (currentChoices.includes(secrets[0], secrets[1], secrets[2], secrets[3])) {
        if (secrets.includes(currentChoices[0])) {
            pegs.push('a')
        } if (secrets.includes(currentChoices[1])) {
            pegs.push('b')
        } if (secrets.includes(currentChoices[2])) {
            pegs.push('c')
        } if (secrets.includes(currentChoices[3])) {
            pegs.push('d')
        }         renderFeedback()
    } 

 }
function renderFeedback() {
    
}

function handlePlay() {
    init();
}
// rows[0].slot1 = currentChoices[0]
// rows[0].slot2 = currentChoices[1]
// rows[0].slot3 = currentChoices[2]
// rows[0].slot4 = currentChoices[3]
// return rows[0]; //not working