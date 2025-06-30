document.addEventListener('DOMContentLoaded', () => {
  // Base card options (unique cards)
  const baseCards = [
    { name: 'chariot', img: 'images/Tarot_The_Chariot.webp' },
    { name: 'emperor', img: 'images/Tarot_The_Emperor.webp' },
    { name: 'empress', img: 'images/Tarot_The_Empress.webp' },
    { name: 'fool', img: 'images/Tarot_The_Fool.webp' },
    { name: 'hierophant', img: 'images/Tarot_The_Hierophant.webp' },
    { name: 'high_priestess', img: 'images/Tarot_The_High_Priestess.webp' },
    { name: 'lovers', img: 'images/Tarot_The_Lovers.webp' },
    { name: 'magician', img: 'images/Tarot_The_Magician.webp' },
    { name: 'justice', img: 'images/Tarot_Justice.webp' }
  ];

  // Difficulty settings
  const difficultyMap = {
    easy: 4,
    medium: 6,
    hard: 9
  };

  // DOM elements
  const grid = document.querySelector('.grid');
  const resultDisplay = document.querySelector('#result');
  const startMenu = document.getElementById('startMenu');
  const startBtn = document.getElementById('startBtn');
  const difficultySelect = document.getElementById('difficulty');
  const themeToggle = document.getElementById('themeToggle');

  // Game state
  let cardArray = [];
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Start game button
  startBtn.addEventListener('click', () => {
    resetGame();
    const level = difficultySelect.value;
    buildDeck(level);
    createBoard();
    startMenu.style.display = 'none';
  });

  // Toggle light/dark theme
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  // Build a deck of cards based on difficulty
  function buildDeck(level) {
    const pairs = difficultyMap[level];
    const selected = baseCards.slice(0, pairs);
    cardArray = [...selected, ...selected].sort(() => 0.5 - Math.random());
  }

  // Create the game board
  function createBoard() {
    grid.innerHTML = '';
    cardArray.forEach((_, i) => {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.webp');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
  }

  // Flip a card
  function flipCard() {
    const cardId = this.getAttribute('data-id');

    // Prevent selecting the same card twice or more than two at once
    if (
      cardsChosenId.includes(cardId) ||
      this.classList.contains('matched') ||
      cardsChosen.length >= 2
    ) {
      return;
    }

    this.setAttribute('src', cardArray[cardId].img);
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  // Check if two selected cards match
  function checkForMatch() {
    const cards = document.querySelectorAll('.grid img');
    const [optionOneId, optionTwoId] = cardsChosenId;

    // Match found (but not the same card clicked twice)
    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      cards[optionOneId].classList.add('matched');
      cards[optionTwoId].classList.add('matched');
      cardsWon.push(cardsChosen);
    } else {
      // Not a match, flip back
      cards[optionOneId].setAttribute('src', 'images/blank.webp');
      cards[optionTwoId].setAttribute('src', 'images/blank.webp');
    }

    // Reset choices
    cardsChosen = [];
    cardsChosenId = [];

    // Update score
    resultDisplay.textContent = cardsWon.length;

    // All pairs found
    if (cardsWon.length === cardArray.length / 2) {
      setTimeout(() => {
        alert('Congratulations! You found them all!');
        startMenu.style.display = 'block';
      }, 100);
    }
  }

  // Reset the game state
  function resetGame() {
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    resultDisplay.textContent = 0;
  }
});
