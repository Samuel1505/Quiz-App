import { jsQuestions } from "./questions.js";

const infoBoxHTML = document.querySelector('.js-info-box');
const clickArea = document.querySelector('.js-quiz-box');
const resultBoxHTML = document.querySelector('.js-result-box');


let answeredCorrect = 0;

export function getNextQuestion(id) {
  let theQuestion;
  const nextButton = document.querySelector('.js-next-que');

  jsQuestions.forEach((jsQuestion) => {
    if (jsQuestion.id === id) {
      theQuestion = jsQuestion;
    }
  });

  return theQuestion;
}

export function questionBuilder(id) {
  
  const count = (jsQuestions.length);  
  const questionResponse = getNextQuestion(id);
  let timeLeft = 16;
    let countdown = setInterval(() => {
    timeLeft--;
    // console.log(timeLeft);
    document.querySelector('.timer_sec').innerHTML = timeLeft;
      if(timeLeft === 0) {
        clearInterval(countdown);
        clickArea.style.pointerEvents = 'none';
        button.style.opacity = 100;
        button.style.pointerEvents = 'all';
      }
    }, 1000);

  document.querySelector('.js-quiz-box').innerHTML = `
  <header>
    <div class="title">Quiz Appliation by Kazeem</div>
    <div class="timer">
      <div class="time_text">Time Left</div>
      <div class="timer_sec"></div>
    </div>
  </header>
  <section class="js-question-section">
    <div class="que_text">
      <span>${questionResponse.question}</span>
    </div>
    <div class="option_list">
      ${getOptions(questionResponse.id)}
    </div>
  </section>
  <footer>
  <div class="total_que js-total-que">
    <span><p>${questionResponse.id}</p> of <p>${count}</p>Quesions</span>
  </div>
  <button class="next_btn js-next-que" data-question-id="${questionResponse.id}">Next Que.</button>
  </footer>`;

  const button = document.querySelector('.js-next-que');
  button.addEventListener('click', () => {
    if (questionResponse.id === count) {
      loadResultContent(count);
    }
    clearInterval(countdown);
    loadQuestion(Number(button.dataset.questionId));
  });

  const optionSelect = document.querySelectorAll('.option');
    clickArea.style.pointerEvents = 'all';

    optionSelect.forEach((element) => {
      
      element.addEventListener('click', () => {
        if(questionResponse.options[element.dataset.optionArray].isCorrect === true) {
            element.style.border = '1px solid lightgreen';
            element.style.backgroundColor = 'lightgreen';
            element.innerHTML = `
              <span>${questionResponse.options[element.dataset.optionArray].choice}</span>
              <div class="icon tick"><i class="fas fa-check"></i></div>`;

            answeredCorrect += 1;
            console.log(answeredCorrect);
            clickArea.style.pointerEvents = 'none';
              
        } else if(questionResponse.options[element.dataset.optionArray].isCorrect === false) {

            element.style.border = '1px solid #f0a6ae';
            element.style.backgroundColor = '#f0a6ae';
            element.innerHTML = `
                  <span>${questionResponse.options[element.dataset.optionArray].choice}</span>
                  <div class="icon cross"><i class="fas fa-times"></i></div>
              `;

            clickArea.style.pointerEvents = 'none';
          }
        
        button.style.opacity = 100;
        button.style.pointerEvents = 'all';
      });
    
  });
  
}

function getOptions(id) {
  let optionsHTML = '';
  const questionResponse = getNextQuestion(id);
  
  questionResponse.options.forEach((option) => {
    optionsHTML += `
      <div class="option" data-option-array=${questionResponse.options.indexOf(option)}>
        <span>${option.choice}</span>
      </div>
    `;
  });

  return optionsHTML;
}

function loadQuestion(currentQuestionId) {
  
  questionBuilder(currentQuestionId + 1);
  
}

function loadResultContent(count) {

  const score = answeredCorrect;
  const numberOfQuestions = count;

  clickArea.style.opacity = 0;
  clickArea.style.pointerEvents = 'none';

  resultBoxHTML.style.opacity = 100;
  resultBoxHTML.style.pointerEvents = 'all';

  document.querySelector('.js-score-content').innerHTML = `You got ${score} out of ${numberOfQuestions} questions. Thank you for participating.</span>`;
}

document.querySelector('.js-restart-quiz').addEventListener('click', () => {
  answeredCorrect = 0;

  resultBoxHTML.style.opacity = 0;
  resultBoxHTML.style.pointerEvents = 'none';

  infoBoxHTML.style.opacity = 100;
  infoBoxHTML.style.pointerEvents = 'all';

});





