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
let secrets = [];
let currentChoices = [];
let score = {};
let gameStatus; 
let rowId = 1;
/*----- cached element references -----*/
const secretEls = [...document.querySelectorAll('#secret > div')];
const bankEls = [...document.querySelectorAll('#bank > div')];
let rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];  
const checkBtn = document.getElementById('check');
let feedbackEls = document.querySelectorAll(`#f${rowId} > div`);
const playBtn = document.getElementById('play');
const msgEl = document.querySelector('h2');

/*----- event listeners -----*/
document.getElementById('bank').addEventListener('click', storeBankClicks);
document.getElementById('check').addEventListener('click', handleCheck);
document.getElementById('play').addEventListener('click', handleReplay);
/*----- functions -----*/
init();

function init() {
    rowId = 1;
    secrets = [];
    gameStatus = null;
    generateSecret(); 
    render();
}
function render() {
    renderSecret();
    renderCheckBtn();
    renderPlayBtn();
    renderMsg();
}
function renderMsg() {
    if (gameStatus === 'W') {
        msgEl.textContent = 'You cracked the code!';
    } else if (gameStatus === 'L') {
        msgEl.innerHTML = 'Dear God, what is there in your funny little brains? <br> It must be really boring.'
    } else {
        msgEl.textContent = 'The game is afoot.'
    }
}
function handleReplay() {
    let clearThese = [...document.querySelectorAll('div')];
    clearThese.forEach(function(div){
        return div.style.backgroundColor = null;
    }) 
    init();
}
function renderPlayBtn() {
    playBtn.style.visibility = gameStatus !== null ? 'visible' : 'hidden'
}
function generateSecret() {
    SECRET_SLOTS.map(function(){
        secrets.push(Math.floor(Math.random() * COLORS.length))
        return 
    })
}
function renderCheckBtn() {
    checkBtn.style.visibility = currentChoices.length === 4 ? 'visible' : 'hidden';
}
function renderBankClicks() {
    rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];
    rowEls.forEach(function(div, idx) {
        div.style.backgroundColor = COLORS[currentChoices[idx]];
    })
}
function renderSecret(){ 
    if (gameStatus !== null) {
        secretEls.forEach(function(div, idx) {
            div.style.backgroundColor = COLORS[secrets[idx]];
            div.innerHTML = null;
        })  
    } else {
        secretEls.forEach(function(div) {
            div.innerHTML = '<h1>?</h1>';
            div.style.backgroundColor = 'white';
        })
    }
};
function storeBankClicks(evt) { 
    if (evt.target === document.querySelector('section')) {
        return
    }
    if (currentChoices.length === SECRET_SLOTS.length) {
        currentChoices = []
        rowEls.forEach(function(div) {
            div.style.backgroundColor = null;
        })
    }
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
    if (currentChoices.length > 4) {
        currentChoices.length = 0
    }
    renderBankClicks();
    render();
    
}
function handleCheck() {
    let perfect = 0;
    let almost = 0;
    if (currentChoices.toString() === secrets.toString()) {
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
    gameStatus = getGameStatus();
    renderFeedback();
    if (gameStatus === null){
        rowId = rowId + 1;
        currentChoices = [];
        rowEls = [...document.querySelectorAll(`#row${rowId} > div`)];
        feedbackEls = document.querySelectorAll(`#f${rowId} > div`);
    }
    render();
}
function getGameStatus() {
    if (score.perfect === 4) {
        return 'W';
    } else if (rowId === MAX_WRONG_GUESSES) {
        return 'L';
    } else {
        return null;
    }
}
function renderFeedback() {
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