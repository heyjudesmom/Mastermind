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
const slots =[1, 2, 3, 4];
/*----- app's state (variables) -----*/
let secrets = []; //Array to hold randomly selected colors
let gameStatus; //true :game in play, false: secret revealed
let guess = [];//array of current guessed colors
let feedback; //array to hold the feedback pegs

/*----- cached element references -----*/
const rowEls = [...document.querySelectorAll('#board > div')];
const secretEls = [...document.querySelectorAll('#secret > div')]
// const feedbackEls = document.querySelectorAll('.f > div');
//TODO: cache the messageEl to declare win or loss

/*----- event listeners -----*/


/*----- functions -----*/
init();

function init() {
    generateSecret(); //Step 1. Done
    render();
};

function generateSecret() { //For Step 1. Done
   slots.map(function(){
        return secrets.push(COLORS[Math.floor(Math.random() * COLORS.length)])
   })
}
function render() {
    renderSecret(); //For Step 1A. Done
  //  renderChoice();
}
// function renderChoice() {
//     evt.target.style.border = '0.5vmin dashed hotpink'
// }
function renderSecret(){
    secretEls.forEach(function(div, idx) {
      div.style.backgroundColor = secrets[idx];
    })
};
//function getColor(evt) {
//     //guards
//     if (evt.target !== document.querySelectorAll('.bank > div')) {
//         return
//     } return evt.target.style.backgroundColor;
// }
