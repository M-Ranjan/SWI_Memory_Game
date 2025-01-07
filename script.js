const fruits = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🥭', '🍍'];
let gameContainer = document.getElementById('game-container');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let movesCountElement = document.getElementById('moves-count');
let timeElement = document.getElementById('time');
let resultElement = document.getElementById('result');

let cards = [];
let firstCard = null;
let secondCard = null;
let moves = 0;
let timer;
let time = 0;
let gameRunning = false;

const initializeGame = () => {
  resultElement.textContent = '';
  gameContainer.innerHTML = '';
  moves = 0;
  time = 0;
  movesCountElement.textContent = 'Moves: 0';
  timeElement.textContent = 'Time: 0s';

  let fruitPairs = [...fruits, ...fruits];
  fruitPairs.sort(() => 0.5 - Math.random());

  fruitPairs.forEach((fruit) => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.fruit = fruit;
    card.textContent = '?';
    card.addEventListener('click', handleCardClick);
    gameContainer.appendChild(card);
  });
  cards = document.querySelectorAll('.card');
};

const handleCardClick = (event) => {
  if (!gameRunning) return;

  let clickedCard = event.target;

  if (clickedCard.classList.contains('matched') || clickedCard === firstCard) return;

  clickedCard.textContent = clickedCard.dataset.fruit;

  if (!firstCard) {
    firstCard = clickedCard;
  } else if (!secondCard) {
    secondCard = clickedCard;
    moves++;
    movesCountElement.textContent = `Moves: ${moves}`;

    if (firstCard.dataset.fruit === secondCard.dataset.fruit) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      firstCard = null;
      secondCard = null;

      if (document.querySelectorAll('.card:not(.matched)').length === 0) {
        clearInterval(timer);
        resultElement.textContent = `You won in ${moves} moves and ${time} seconds!`;
        gameRunning = false;
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        firstCard = null;
        secondCard = null;
      }, 500); // Flip back after 500ms
    }
  }
};

const startGame = () => {
  initializeGame();
  gameRunning = true;
  startButton.classList.add('hide');
  stopButton.classList.remove('hide');

  timer = setInterval(() => {
    time++;
    timeElement.textContent = `Time: ${time}s`;

    if (time >= 60) { // End game when timer reaches 60 seconds
      clearInterval(timer);
      resultElement.textContent = 'Time is up! Game over.';
      gameRunning = false;
      stopButton.classList.add('hide');
      startButton.classList.remove('hide');
    }
  }, 1000);
};

const stopGame = () => {
  clearInterval(timer);
  resultElement.textContent = 'Game stopped!';
  gameRunning = false;
  startButton.classList.remove('hide');
  stopButton.classList.add('hide');
  cards.forEach((card) => (card.textContent = '?'));
};

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);
