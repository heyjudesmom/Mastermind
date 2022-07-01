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
/*----- app's state (variables) -----*/
let gameStatus;
let board;
let secret;
/*----- cached element references -----*/
const rowEls = [...document.querySelectorAll('#board > div')]
const feedbackEls = document.querySelector('.f > div')
/*----- event listeners -----*/
/*----- functions -----*/
