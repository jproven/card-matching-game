document.addEventListener('DOMContentLoaded', () => {

    // Card options
    const baseCards = [
        { name: 'chariot', img: 'images/Tarot_The_Chariot.webp' },
        { name: 'emperor', img: 'images/Tarot_The_Emperor.webp' },
        { name: 'empress', img: 'images/Tarot_The_Empress.webp' },
        { name: 'fool', img: 'images/Tarot_The_Fool.webp' },
        { name: 'hierophant', img: 'images/Tarot_The_Hierophant.webp' },
        { name: 'high_priestess', img: 'images/Tarot_The_High_Priestess.webp' },
        { name: 'lovers', img: 'images/Tarot_The_Lovers.webp' },
        { name: 'magician', img: 'images/Tarot_The_Magician.webp' },
        { name: 'justice', img: 'images/Tarot_Justice.webp' },
    ]

    const cardArray = [...baseCards, ...baseCards] // Duplicate the cards for matching
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []

    // Create the game board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.webp')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    createBoard()

    // Check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('You found a match!')
            cards[optionOneId].style.visibility = 'hidden'
            cards[optionTwoId].style.visibility = 'hidden'
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/blank.webp')
            cards[optionTwoId].setAttribute('src', 'images/blank.webp')
            alert('Sorry, try again!')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    // Flip the card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
});