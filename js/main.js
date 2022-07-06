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
let currentChoices = [];//Array to hold bank choices for row
let score = {};
let gameStatus; //true: game in play, false: secret revealed
let rowId = 1;
//let currentRow;
/*----- cached element references -----*/
const secretEls = [...document.querySelectorAll('#secret > div')];
const bankEls = [...document.querySelectorAll('#bank > div')];
//const boardRows = [...document.querySelectorAll('.guess')].reverse();
// bankEls.forEach(function(div, idx) {
//     div.style.backgroundColor = COLORS[idx]
// });
let rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];  
const checkBtn = document.getElementById('check');
let feedbackEls = document.querySelectorAll(`#f${rowId} > div`);
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
   // currentRow = boardRows[rowId - 1];
}
function render() {
    renderSecret(); //For Step 1A. Done
    renderBankClicks(); //Done
    renderCheckBtn(); //Done

}
function generateSecret() { //For Step 1. Done
    SECRET_SLOTS.map(function(){
        secrets.push(Math.floor(Math.random() * COLORS.length))
        return 
    })
}
function renderCheckBtn() {
    checkBtn.style.visibility = currentChoices.length === 4 ? 'visible' : 'hidden';
}
function renderBankClicks() {
    //guards
    rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];
    rowEls.forEach(function(div, idx) {
        // console.log(div, idx, 'hello')
        div.style.backgroundColor = COLORS[currentChoices[idx]];
    })
}

function renderSecret(){ //For step 1A. Done.
    secretEls.forEach(function(div, idx) {
        div.style.backgroundColor = COLORS[secrets[idx]];
    })
};
function storeBankClicks(evt) { //For Step 2a. Done
    console.log(rowEls, rowId)
    //guards
    if (evt.target === document.querySelector('section')) {
        return
    }
    // if (currentChoices.length === SECRET_SLOTS.length) {
    //     currentChoices = []
    //     rowEls.forEach(function(div) {
    //         // console.log(div, 'hello')
    //         div.style.backgroundColor = null;
    //     })
    // }
    if (evt.target === document.getElementById('red')) {
        currentChoices.push(0);
    }if (evt.target === document.getElementById('orange')) {
        currentChoices.push(1);
    }if (evt.target === document.getElementById('yellow')) {
        currentChoices.push(2);
    }if (evt.target === document.getElementById('green')) {
        currentChoices.push(3);
    }if (evt.target === document.getElementById('blue')) {
        currentChoices.push(4);
    }if (evt.target === document.getElementById('purple')) {
        currentChoices.push(5);
    }if (evt.target === document.getElementById('indigo')) {
        currentChoices.push(6);
    }if (evt.target === document.getElementById('brown')) {
        currentChoices.push(7);
    }
    // console.log(currentChoices) //TODO: delete this console log
    render();
}
function handleCheck() {
    let perfect = 0;
    let almost = 0;
    if (currentChoices.toString() === secrets.toString()) {
        console.log('hello'); //TODO: Change this to render the secret code to visible
        //  gameStatus = false;
        render();
    } 
    let secretCopy = secrets.map(function(val){
        return val
    })
    let guessCopy = currentChoices.map(function(val){
        return val
    })
    guessCopy.forEach(function(val, idx){
        if (val === secretCopy[idx]) {
            perfect += 1;
            guessCopy[idx] = null
            secretCopy[idx] = null
        } 
        return
    })
    guessCopy.forEach(function(val, idx){
        if (val === null) {
            return
        }
        secretCopy.indexOf(val);
        if (secretCopy.indexOf(val) > -1) {
            almost += 1;
            guessCopy[idx] = null
        }
    })
    score.perfect = perfect;
    score.almost = almost;
    // currentChoices.forEach(function(choice, idx){
    //     if (secrets[idx] === choice) {
    //         feedback.unshift('black');
    //     } else if (secrets.includes(choice)) {
    //         feedback.push('white')
    //     }    
    // })
   renderFeedback()
   
   rowId = rowId + 1;
   currentChoices = [];
   rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];
   feedbackEls = document.querySelectorAll(`#f${rowId} > div`);
   //currentRow = boardRows[rowId-1];
}

function renderFeedback() {
    console.log(score);
    feedbackEls.forEach(function(el) {
        if (score.perfect > 0) {
            el.style.backgroundColor = 'black';
            score.perfect--;
        } else if (score.almost > 0) {
            el.style.backgroundColor = 'white';
            score.almost--;
        }
    })
}

function handlePlay() {
    init();
}
// rows[0].slot1 = currentChoices[0]
// rows[0].slot2 = currentChoices[1]
// rows[0].slot3 = currentChoices[2]
// rows[0].slot4 = currentChoices[3]
// return rows[0]; //not working