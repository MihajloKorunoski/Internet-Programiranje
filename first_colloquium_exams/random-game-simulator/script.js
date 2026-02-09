const nameInput = document.getElementById("name");
const codeInput = document.getElementById("code");
const valueInput = document.getElementById("value");
const shapeSelect = document.getElementById("shape");
const colorSelect = document.getElementById("color");
const addBtn = document.getElementById("addBtn");
const startBtn = document.getElementById("startBtn");
const cardsWrap = document.getElementById("cards");
const costSumSpan = document.getElementById("costSum");
const formPanel = document.getElementById("formPanel");

let cards = [];
let moves = 0;
let gameStarted = false;

function validCode(code) {
    return /^[A-Z]+$/.test(code);
}

function calcCost(card, currentIndex) {
    const wrongShape = card.shape !== card.targetShape ? 1 : 0;
    return Math.abs(card.targetIndex - currentIndex) * 50 + wrongShape * 30;
}


function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const code = codeInput.value.trim();
    const valueStr = valueInput.value.trim();
    const chosenShape = shapeSelect.value;
    const color = colorSelect.value;

    if (!name || !code || !valueStr) {
        alert("All fields are required!");
        return;
    }

    if (!validCode(code)) {
        alert("Code must contain only uppercase letters (A-Z).");
        return;
    }

    const value = parseInt(valueStr, 10);
    if (Number.isNaN(value)) {
        alert("Value must be a number!");
        return;
    }


    cards.push({
        name,
        code,
        value,
        color,
        shape: chosenShape,
        targetShape: chosenShape,
        targetIndex: null
    });

    renderCards(false);
});

startBtn.addEventListener("click", () => {
    if (cards.length === 0) {
        alert("Add at least one card first!");
        return;
    }

    gameStarted = true;
    formPanel.style.display = "none";

    const targets = shuffle([...Array(cards.length).keys()]);
    cards.forEach((c, idx) => {
        c.targetIndex = targets[idx];
    });

    shuffle(cards);

    cards.forEach(c => {
        c.shape = Math.random() < 0.5 ? "square" : "circle";
    });

    renderCards(true);
});

function renderCards(started) {
    cardsWrap.innerHTML = "";
    let totalCost = 0;

    cards.forEach((c, i) => {
        const cost = started ? calcCost(c, i) : 0;
        totalCost += cost;

        const div = document.createElement("div");
        div.className = `card ${c.shape}`;
        div.style.background = c.color;
        div.innerHTML = `
            <b>Name:</b> ${c.name}<br><br>
            <b>Code:</b> ${c.code}<br><br>
            <b>Value:</b> ${c.value}<br>
            ${started ? `
                <br>
                <b>Position:</b> ${c.targetIndex + 1}<br>
                <b>Shape:</b> ${c.targetShape}<br>
                <div class="controls">
                    <button class="actionsBtn" onclick="moveLeft(${i})">&lt;</button>
                    <button class="actionsBtn" onclick="moveRight(${i})">&gt;</button>
                    <button class="actionsBtn" onclick="changeShape(${i})">Change shape</button>
                </div>
            ` : ""}
        `;

        cardsWrap.appendChild(div);
    });

    costSumSpan.textContent = totalCost;

    if (started && cards.length > 0 && totalCost === 0) {
        const totalValue = cards.reduce((s, c) => s + c.value, 0);
        alert("Score: " + (totalValue - moves * 10));
    }
}

window.moveLeft = (i) => {
    if (!gameStarted) return;
    if (i === 0) return;

    [cards[i - 1], cards[i]] = [cards[i], cards[i - 1]];
    moves++;
    renderCards(true);
};

window.moveRight = (i) => {
    if (!gameStarted) return;
    if (i === cards.length - 1) return;

    [cards[i], cards[i + 1]] = [cards[i + 1], cards[i]];
    moves++;
    renderCards(true);
};

window.changeShape = (i) => {
    if (!gameStarted) return;

    cards[i].shape = (cards[i].shape === "square") ? "circle" : "square";
    moves++;
    renderCards(true);
};