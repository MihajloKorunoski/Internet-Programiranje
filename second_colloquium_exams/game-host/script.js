const payload = {
    "data": "Approved",
    "modified": "yes",
    "date_checked": "21.01.2025",
    "uploaded": [{"data": "yes"}, {"course": "IPNKS"}],
    "game": {
        "memory": "NNPO",
        "winner": "T",
        "players": [{
            "num_n": "2745",
            "name": "Luigi",
            "nickname": "eypfk2^",
            "amount": "93",
            "sign": "1"
        }, {
            "num_n": "9345",
            "name": "Bambs",
            "nickname": "k@me%k",
            "amount": "210",
            "sign": "3"
        }, {
            "num_n": "4558",
            "name": "Mayru",
            "nickname": "mr4Plw2",
            "amount": "15",
            "sign": "4"
        }, {
            "num_n": "1356",
            "name": "Ansur",
            "nickname": "ppe@#5j$",
            "amount": "120",
            "sign": "1"
        }, {
            "num_n": "1029",
            "name": "Ruris",
            "nickname": "ma8!e",
            "amount": "10",
            "sign": "2"
        }, {
            "num_n": "2934",
            "name": "Rimis",
            "nickname": "lp4eb!",
            "amount": "50",
            "sign": "3"
        }, {
            "num_n": "8866",
            "name": "Dusek",
            "nickname": "o3setr",
            "amount": "100",
            "sign": "1"
        }, {
            "num_n": "3429",
            "name": "Kilis",
            "nickname": "jwosi3^",
            "amount": "20",
            "sign": "3"
        }, {
            "num_n": "9764",
            "name": "Miker",
            "nickname": "sl4ea^",
            "amount": "55",
            "sign": "2"
        }]
    }
};


const symbols = [
    {type: 1, key: "Water", img: "1.jpg"},
    {type: 2, key: "Fire", img: "3.jpg"},
    {type: 3, key: "Wind", img: "2.jpg"},
    {type: 4, key: "Earth", img: "4.jpg"},
];

const byType = Object.fromEntries(symbols.map(s => [String(s.type), s]));

const startBtn = document.getElementById("startBtn");
const statsBtn = document.getElementById("statsBtn");
const winnerLine = document.getElementById("winnerLine");
const playersRow = document.getElementById("playersRow");
const spinImg = document.getElementById("spinImg");
const spinner = document.getElementById("spinner");

const betsChart = document.getElementById("betsChart");
const winsChart = document.getElementById("winsChart");

function isValidNickname(nick) {
    return !/[@5]/.test(String(nick));
}

let players = payload.game.players
    .filter(p => isValidNickname(p.nickname))
    .map(p => ({
            id: p.num_n,
            name: p.name,
            nickname: p.nickname,
            amount: Number(p.amount),
            type: Number(p.sign),
            wins: 0,
            removed: false
        })
    );

const initialBetsByType = {"1": 0, "2": 0, "3": 0, "4": 0}

players.forEach(p => {
    const k = String(p.type);
    if (initialBetsByType[k] !== undefined)
        initialBetsByType[k] += p.amount;
});
const winCountsByType = {"1": 0, "2": 0, "3": 0, "4": 0};

const cardColors = ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c1", "c2", "c3"];

function renderPlayers() {
    playersRow.innerHTML = "";

    if (players.length === 0) {
        playersRow.innerHTML = `<div class="muted">No valid players.</div>`;
        return;
    }

    players.forEach((p, idx) => {
        const card = document.createElement("div");
        card.className = `card ${cardColors[idx % cardColors.length]}`;
        card.dataset.id = p.id;

        card.innerHTML = `
      Name: ${p.name}<br>
      Amount: ${p.amount}<br>
      Type: ${p.type}
      <div class="wins"></div>
    `;

        playersRow.appendChild(card);
    });

    // sequential appear + scale (anime)
    const cards = Array.from(document.querySelectorAll(".card"));
    cards.forEach((el, i) => {
        anime.animate(el, {
            opacity: [0, 1],
            scale: [0.7, 1],
            duration: 450,
            delay: i * 70,
            ease: "outBack"
        });
    });
}

function updateCardWins() {
    players.forEach(p => {
        const el = document.querySelector(`.card[data-id="${p.id}"]`);
        if (!el)
            return;
        const winsEl = el.querySelector(".wins");
        winsEl.textContent = p.wins > 0 ? "+".repeat(p.wins) : "";
    })
}

renderPlayers();

let spinning = false;
let spinTimer = null;

function randomWinnerType() {
    const idx = Math.floor(Math.random() * symbols.length);
    return symbols[idx].type;
}

function setSpinnerToType(t) {
    const s = byType[String(t)];
    if (!s)
        return;
    spinImg.src = s.img;
    spinImg.alt = s.key;
}

function spinAnimationStep() {
    anime.animate(spinImg, {
        opacity: [0.6, 1],
        scale: [0.95, 1],
        duration: 120,
        direction: "alternate",
        ease: "inOutSine"
    });
}

function startSpin() {
    if (spinning)
        return;
    spinning = true;
    startBtn.disabled = true;
    winnerLine.textContent = "";

    const order = [1, 2, 3, 4];
    let i = 0;
    let steps = 16 + Math.floor(Math.random() * 12);

    spinTimer = setInterval(() => {
        const t = order[i % order.length];
        setSpinnerToType(t);
        spinAnimationStep();

        i += 1;
        steps -= 1;

        if (steps <= 0) {
            clearInterval(spinTimer);
            spinTimer = null;
            finishSpin();
        }
    }, 150);
}

function finishSpin() {
    const winType = randomWinnerType();
    const sym = byType[String(winType)];

    setSpinnerToType(winType);

    anime.animate(spinImg, {
        scale: [1, 1.18],
        duration: 220,
        direction: "alternate",
        ease: "outQuad"
    });

    winnerLine.textContent = "Winning symbol: " + sym.key;

    winCountsByType[String(winType)] += 1;

    players.forEach(p => {
        if (p.type === winType)
            p.wins += 1;
    });

    updateCardWins();

    const winnerCards = players
        .filter(p => p.type === winType)
        .map(p => document.querySelector(`.card[data-id="${p.id}"]`))
        .filter(Boolean);

    if (winnerCards.length > 0) {
        anime.animate(winnerCards, {
            scale: [1, 1.05],
            duration: 180,
            direction: "alternate",
            ease: "inOutSine"
        });
    }

    spinning = false;
    startBtn.disabled = false;
}

startBtn.addEventListener("click", startSpin);


function plotStats() {
    const labels = symbols.map(s => s.key);
    const betVals = symbols.map(s => initialBetsByType[String(s.type)] || 0);
    const moneyWonVals = symbols.map(s => {
        const t = String(s.type);
        return (initialBetsByType[t] || 0) * (winCountsByType[t] || 0);
    });

    Plotly.react(betsChart, [{
        x: labels,
        y: betVals,
        type: "bar",
        name: "Initial Bets"
    }],{
        title: {text: "Initial best by symbol"},
        margin: { t: 40, r: 10, b: 35, l: 45 },
        yaxis: { title: "Total bet amount" }
    }, {responsive: true, displayModeBar: false});

    Plotly.react(winsChart, [{
        x: labels,
        y: moneyWonVals,
        type: "bar",
        name: "Money Won"
    }], {
        title: { text: "Total money won by symbol (bets × wins)" },
        margin: { t: 40, r: 10, b: 35, l: 45 },
        yaxis: { title: "Money won" }
    }, { responsive: true, displayModeBar: false });
}

function removeNoWinCards(){
    const toRemove = players.filter(p => p.wins === 0 && !p.removed);
    if(toRemove.length === 0)
        return;

    const els = toRemove
        .map(p => document.querySelector(`.card[data-id="${p.id}"]`))
        .filter(Boolean);

    anime.animate(els, {
        opacity: [1,0],
        scale: [1, 0.85],
        duration: 320,
        ease: "inQuad",
        onComplete: () =>{
            els.forEach(el => el.remove());
            toRemove.forEach(p => p.removed = true);
        }
    });
}

statsBtn.addEventListener("click", () => {
    plotStats();
    removeNoWinCards();
});

setSpinnerToType(1);