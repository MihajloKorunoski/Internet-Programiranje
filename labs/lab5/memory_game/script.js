    document.addEventListener("DOMContentLoaded", function() {
        const gameBoard = document.querySelector('table');
        const defaultSrc = 'pozadina.png';
        let images = ['krofna.png', 'guma.png', 'glava.png', 'boja.png', 'sise.png', 'maus.png', 'zemja.png', 'piano.png'];
        images = images.concat(images); // Duplicate the array for pairs

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function initializeGame() {
            shuffle(images);
            images.forEach((image, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = defaultSrc;
                imgElement.setAttribute('data-true-src', image);
                imgElement.setAttribute('data-flipped', 'false');
                imgElement.addEventListener('click', onCardClicked);
                const td = document.createElement('td');
                td.appendChild(imgElement);
                if (index % 4 === 0) {
                    const tr = document.createElement('tr');
                    gameBoard.appendChild(tr);
                }
                gameBoard.lastChild.appendChild(td);
            });
        }

        function onCardClicked(event) {
            const clickedImg = event.target;
            const flippedCards = document.querySelectorAll('img[data-flipped="true"]');

            if (clickedImg.getAttribute('data-flipped') === 'false' && flippedCards.length < 2) {
                clickedImg.setAttribute('data-flipped', 'true');
                clickedImg.src = clickedImg.getAttribute('data-true-src');

                if (flippedCards.length === 1) {
                    if (flippedCards[0].getAttribute('data-true-src') === clickedImg.getAttribute('data-true-src')) {
                        checkEndGame();
                    } else {
                        setTimeout(() => {
                            flippedCards[0].src = defaultSrc;
                            flippedCards[0].setAttribute('data-flipped', 'false');
                            clickedImg.src = defaultSrc;
                            clickedImg.setAttribute('data-flipped', 'false');
                        }, 1000);
                    }
                }
            }
        }

        function checkEndGame() {
            const allFlippedCards = document.querySelectorAll('img[data-flipped="true"]');
            if (allFlippedCards.length === images.length) {
                setTimeout(() => {
                    alert('Game over, you found all matches!');
                    resetGame();
                }, 500);
            }
        }

        function resetGame() {
            const cards = document.querySelectorAll('img');
            shuffle(images);
            cards.forEach((card, index) => {
                card.src = defaultSrc;
                card.setAttribute('data-true-src', images[index]);
                card.setAttribute('data-flipped', 'false');
            });
        }

        document.getElementById('reset').addEventListener('click', resetGame);
        initializeGame();
    });
