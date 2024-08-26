import { questionBuilder } from "./quiz.js";

const startBtn = document.querySelector('.js-start-btn');
const quitBtn = document.querySelector('.js-quit-btn');
const continueBtn = document.querySelector('.js-continue-btn');
const infoBoxHTML = document.querySelector('.js-info-box');
const quizBoxHTML = document.querySelector('.js-quiz-box');

startBtn.addEventListener('click', () => {  
  startBtn.style.pointerEvents = 'none';
  startBtn.style.opacity = 0;
  // Remove specific CSS properties
  infoBoxHTML.style.opacity = 100;
  infoBoxHTML.style.pointerEvents = 'all';
});

quitBtn.addEventListener('click', () => {
  // add specific CSS properties
  infoBoxHTML.style.opacity = 0;
  infoBoxHTML.style.pointerEvents = 'none';

  startBtn.style.pointerEvents = 'all';
  startBtn.style.opacity = 100;
});

continueBtn.addEventListener('click', () => {
  infoBoxHTML.style.opacity = 0;
  infoBoxHTML.style.pointerEvents = 'none';

  quizBoxHTML.style.opacity = 100;
  quizBoxHTML.style.pointerEvents = 'all';

  questionBuilder(1);
});

document.querySelector('.js-finished-quiz').addEventListener('click', () => {
  location.reload();
})