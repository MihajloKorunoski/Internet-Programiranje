    document.addEventListener('DOMContentLoaded', function () {
        const cardsContainer = document.getElementById('cardsContainer')
        const totalSoldDisplay = document.getElementById('totalSold')
        let totalSold = 0
        let cards = {}

        function sellCard(id) {
            totalSold += cards[id].price
            totalSoldDisplay.textContent = totalSold

            delete cards[id]
            renderCards()
        }

        function renderCards() {
            cardsContainer.innerHTML = '';

            for (const id in cards) {
                const card = cards[id]
                const cardElement = document.createElement('div')
                cardElement.classList.add('card')
                cardElement.style.backgroundColor = card.color
                cardElement.style.width = card.width + 'px'
                cardElement.style.height = card.height + 'px'
                cardElement.innerHTML = `
                    <p>ID: ${id}</p>
                    <p>Width: ${card.width}</p>
                    <p>Height: ${card.height}</p>
                    <p>Color: ${card.color}</p>
                    <p>Price: ${card.price}</p>
                    <button onclick="sellCard('${id}')">Sell</button>
                `
                cardsContainer.append(cardElement)
            }
        }

        window.sellCard = sellCard;

        function addOrUpdateCards(username, id, width, height, color) {
            if (!id.match(/^[a-z]+$/)) {
                alert("ID must consist of lowercase letters only.")
                return
            }
            if (width <= 0 || width > 500 || height <= 0 || height > 500) {
                alert("Width and Height must be non-zero values and no more than 500.")
                return
            }
            if (color === ''){
                alert("Please select a color.")
                return
            }
            let price = width * height * 0.5
            if (color === 'red')
                price += 1000
            if (cards[id]) {
                cards[id].width = width
                cards[id].height = height
                cards[id].color = color
                cards[id].price = price
            } else {
                cards[id] = {username, width, height, color, price}
            }

            renderCards();
        }

        document.getElementById('addCardButton').addEventListener('click', function () {
            const username = document.getElementById('username').value.trim()
            const id = document.getElementById('id_input').value.trim()
            const width = parseInt(document.getElementById('width').value, 10)
            const height = parseInt(document.getElementById('height').value, 10)
            const color = document.getElementById('color').value

            document.getElementById('username').value = '';
            document.getElementById('id_input').value = '';
            document.getElementById('width').value = '';
            document.getElementById('height').value = '';
            document.getElementById('color').value = '';

            addOrUpdateCards(username, id, width, height, color)
        })
    })
