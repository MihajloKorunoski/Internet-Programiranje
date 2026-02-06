const fullNameInput = document.getElementById("fullName");
const amountInput = document.getElementById("amount");
const codeInput = document.getElementById("code");
const comboInput = document.getElementById("combo");
const bonusSelect = document.getElementById("bonus");

const addBtn = document.getElementById("addBtn");
const weeklyBtn = document.getElementById("weeklyBtn");

const cardsWrap = document.getElementById("cards");
const luckyBallsWrap = document.getElementById("luckyBalls");
const totalWinSpan = document.getElementById("totalWin");

let tickets = [];
const usedCodes = new Set();

let weeklyNumbers = null;

function initLuckyBalls() {
    luckyBallsWrap.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        const b = document.createElement("div");
        b.className = "ball";
        b.textContent = "-";
        luckyBallsWrap.appendChild(b);
    }
}

initLuckyBalls();

function setLuckyBalls(nums) {
    luckyBallsWrap.innerHTML = "";
    nums.forEach(n => {
        const b = document.createElement("div");
        b.className = "ball";
        b.textContent = String(n);
        luckyBallsWrap.appendChild(b);
    })
}

function validCode(code) {
    return /^[A-Za-z]+$/.test(code);
}

function parseCombination(str) {
    const parts = str.split(",").map(s => s.trim()).filter(s => s !== "");
    if (parts.length !== 7)
        return null;

    const nums = parts.map(p => Number(p));
    if (nums.some(n => !Number.isInteger(n)))
        return null;
    if (nums.some(n => n < 1 || n > 31))
        return null;

    const set = new Set(nums);
    if (set.size !== 7)
        return null;

    return nums;
}

function generateWeeklyNumbers() {
    const s = new Set()
    while (s.size < 7) {
        s.add(Math.floor(Math.random() * 31) + 1);
    }
    return [...s].sort((a, b) => a - b);
}

// function generateWeeklyNumbers() {
//     // 7 unique numbers from 1..31
//     const pool = [];
//     for (let i = 1; i <= 31; i++) pool.push(i);
//
//     // Fisher-Yates shuffle
//     for (let i = pool.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [pool[i], pool[j]] = [pool[j], pool[i]];
//     }
//
//     return pool.slice(0, 7).sort((a, b) => a - b);
// }

function countMatches(combo, weekly) {
    const weeklySet = new Set(weekly);
    let hits = 0;
    combo.forEach(n => {
        if (weeklySet.has(n))
            hits++;
    });
    return hits;
}

function computeWin(amount, hits, bonus){
    let win = amount + hits * 30;
    if(bonus)
        win += 500;
    return win;
}

function cardClassByHits(hits){
    if (hits <= 3)
        return "yellowCard";
    if (hits === 4 || hits === 5)
        return "blueCard";
    return "greenCard";
}

function renderTickets(){
    cardsWrap.innerHTML = "";

    let totalWin = 0;

    tickets.forEach((t) => {
        let hits = 0;
        let win = 0;

        if(weeklyNumbers){
            hits = countMatches(t.combo, weeklyNumbers);
            win = computeWin(t.amount, hits, t.bonus);
            totalWin += win;
        }

        const card = document.createElement("div");
        card.className = "card";

        if(weeklyNumbers){
            card.classList.add(cardClassByHits(hits));
        }

        const comboBalls = t.combo
            .slice()
            .sort((a, b) => a - b)
            .map(n => `<div class="ball">${n}</div>`)
            .join("");

        card.innerHTML = `
            <div class="row"><b>Name:</b> ${t.fullName}</div>
            <div class="row"><b>Code:</b> ${t.code}</div>
            <div class="row"><b>Combination:</b></div>
            <div class="comboBalls">${comboBalls}</div>
            <div class="row"><b>Initial Amount:</b> ${t.amount}</div>
            ${weeklyNumbers ? `
                <div class="row"><b>Hits:</b> ${hits}</div>
                <div class="row"><b>Total win:</b> ${win}</div>
                <button class="actionsBtn" data-pay="${t.code}">Get Paid</button>
            ` : ""}
        `;

        cardsWrap.appendChild(card);
    });

    totalWinSpan.textContent = String(totalWin);

    if(weeklyNumbers){
        document.querySelectorAll("[data-pay]").forEach(btn => {
            btn.addEventListener("click", () => {
                const code = btn.getAttribute("data-pay");
                payTicket(code);
            })
        })
    }
}

function payTicket(code){
    const idx = tickets.findIndex(t => t.code === code);
    if(idx === -1)
        return;

    tickets.splice(idx, 1);
    renderTickets();
}

addBtn.addEventListener("click", () => {
    const fullName = fullNameInput.value.trim();
    const amountStr = amountInput.value.trim();
    const code = codeInput.value.trim();
    const comboStr = comboInput.value.trim();
    const bonus = bonusSelect.value === "yes";

    if(!fullName || !amountStr || !code || !comboStr){
        alert("All fields are required!");
    }

    const amount = Number(amountStr);
    if(!Number.isFinite(amount) || amount < 0) {
        alert("Ticket amount must be a valid non-negative number!");
        return;
    }

    if(!validCode(code)){
        alert("Code must contain only letters and must not contain digits, ! or %");
        return;
    }

    if(usedCodes.has(code)){
        alert("Code is already used! Enter a different code.");
        return;
    }

    const combo = parseCombination(comboStr);
    if(!combo){
        alert("Combination must be exactly 7 unique numbers (1-31) separated by commas.");
        return;
    }

    usedCodes.add(code);
    tickets.push({fullName, amount, code, combo, bonus});

    renderTickets();
});

weeklyBtn.addEventListener("click", () => {
    if(tickets.length < 5){
        alert("You need at least 5 paid combinations before generating weekly numbers.")
        return;
    }

    weeklyNumbers = generateWeeklyNumbers();
    setLuckyBalls(weeklyNumbers);

    renderTickets();
})