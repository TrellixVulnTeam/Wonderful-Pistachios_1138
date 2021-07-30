// Flips cards when you click inside of the major container that holds them

const cards = document.querySelectorAll('#cards .row');
const cardArea = document.querySelector('#cards');

const flipCards = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].insertBefore(cards[i].children[1], cards[i].children[0]);
    }
}

cardArea.addEventListener('click', flipCards);