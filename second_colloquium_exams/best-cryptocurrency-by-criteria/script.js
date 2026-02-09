const API_URL =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=usd" +
    "&order=market_cap_desc" +
    "&per_page=250&page=1" +
    "&sparkline=false" +
    "&price_change_percentage=24h";

const criteriaEl = document.getElementById("criteria");
const badgesWrapEl = document.getElementById("badgesWrap");
const hintEl = document.getElementById("hint");

const cardsRowEl = document.getElementById("cardsRow");
const actionsEl = document.getElementById("actions");
const removeBtn = document.getElementById("removeBtn");
const statsBtn = document.getElementById("statsBtn");

const statsBoxEl = document.getElementById("statsBox");
const statsBodyEl = document.getElementById("statsBody");

const priceChartEl = document.getElementById("priceChart");
const changeChartEl = document.getElementById("changeChart");

let allCoins = [];
let currentTop = []; // current top 30 shown
let selected1 = null;
let selected2 = null;

let pulseAnim = null;

function safeNum(x) {
    return (typeof x === "number" && isFinite(x)) ? x : null;
}

function formatMoney(x) {
    const n = safeNum(x);
    if (n === null) return "Unknown";
    return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function formatBig(x) {
    const n = safeNum(x);
    if (n === null) return "Unknown";
    return n.toLocaleString();
}

function formatPct(x) {
    const n = safeNum(x);
    if (n === null) return "Unknown";
    return n.toFixed(2) + "%";
}

async function loadData() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch CoinGecko data");
    return res.json();
}


function getTop30By(crit) {
    const arr = allCoins.slice();

    arr.sort((a, b) => {
        const va = safeNum(a[crit]);
        const vb = safeNum(b[crit]);

        // nulls go last
        if (va === null && vb === null) return 0;
        if (va === null) return 1;
        if (vb === null) return -1;

        // descending
        return vb - va;
    });

    return arr.slice(0, 30);
}

function renderBadges() {
    badgesWrapEl.innerHTML = "";

    currentTop.forEach(c => {
        const b = document.createElement("div");
        b.className = "badge";
        b.dataset.id = c.id;

        const img = document.createElement("img");
        img.src = c.image;
        img.alt = c.name;

        const sym = document.createElement("div");
        sym.className = "sym";
        sym.textContent = c.symbol;

        b.appendChild(img);
        b.appendChild(sym);

        b.addEventListener("click", () => onBadgeClick(c.id));

        badgesWrapEl.appendChild(b);
    });

    const els = Array.from(document.querySelectorAll(".badge"));
    els.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "scale(0.6)";
        anime.animate(el, {
            opacity: [0, 1],
            scale: [0.6, 1],
            duration: 520,
            delay: i * 60,
            ease: "outBack"
        });
    });

    updateBadgeHighlights();
}

function updateBadgeHighlights() {
    const els = Array.from(document.querySelectorAll(".badge"));
    els.forEach(el => {
        el.classList.remove("selected1", "selected2");
        const id = el.dataset.id;
        if (selected1 && id === selected1.id) el.classList.add("selected1");
        if (selected2 && id === selected2.id) el.classList.add("selected2");
    });
}

function startPulseForSecondPick() {
    stopPulse();

    pulseAnim = anime.animate(".badge", {
        scale: [1, 1.08],
        duration: 500,
        direction: "alternate",
        ease: "inOutSine",
        loop: 10
    });
}

function stopPulse() {
    if (pulseAnim && typeof pulseAnim.cancel === "function") {
        pulseAnim.cancel();
    }
    pulseAnim = null;

    const els = Array.from(document.querySelectorAll(".badge"));
    els.forEach(el => el.style.transform = "scale(1)");
}

function renderCharts() {
    const names = currentTop.map(c => c.symbol.toUpperCase());
    const prices = currentTop.map(c => safeNum(c.current_price) ?? 0);
    const changes = currentTop.map(c => safeNum(c.price_change_percentage_24h) ?? 0);

    Plotly.react(priceChartEl, [{
        x: names,
        y: prices,
        type: "scatter",
        mode: "lines+markers",
        name: "Price"
    }], {
        title: { text: "Current Prices of Top Cryptocurrencies" },
        margin: { t: 60, r: 20, b: 90, l: 70 },
        xaxis: { title: "Cryptocurrency", tickangle: -90 },
        yaxis: { title: "Price (USD)" }
    }, { responsive: true });

    Plotly.react(changeChartEl, [{
        x: names,
        y: changes,
        type: "bar",
        name: "24h %"
    }], {
        title: { text: "24h Price Change (%)" },
        margin: { t: 60, r: 20, b: 90, l: 70 },
        xaxis: { title: "Cryptocurrency", tickangle: -90 },
        yaxis: { title: "Price Change (%)" }
    }, { responsive: true });
}

function makeCard(coin, label) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = coin.id;

    card.innerHTML = `
    <div class="cardTitle">
      <img src="${coin.image}" alt="${coin.name}">
      <span>${label}: ${coin.name} (${coin.symbol.toUpperCase()})</span>
    </div>
    <div class="infoRow"><b>Current price</b><span>${formatMoney(coin.current_price)}</span></div>
    <div class="infoRow"><b>Market cap</b><span>${formatBig(coin.market_cap)}</span></div>
    <div class="infoRow"><b>Volume</b><span>${formatBig(coin.total_volume)}</span></div>
    <div class="infoRow"><b>24h change</b><span>${formatPct(coin.price_change_percentage_24h)}</span></div>
  `;

    return card;
}

function animateCardIn(card, delay = 0) {
    card.style.opacity = "0";
    card.style.transform = "translateY(10px) scale(0.98)";
    anime.animate(card, {
        opacity: [0, 1],
        translateY: [10, 0],
        scale: [0.98, 1],
        duration: 420,
        delay,
        ease: "outQuad"
    });
}

function renderCards() {
    cardsRowEl.innerHTML = "";
    statsBoxEl.style.display = "none";
    statsBodyEl.innerHTML = "";

    if (!selected1 && !selected2) return;

    if (selected1) {
        const c1 = makeCard(selected1, "Coin 1");
        cardsRowEl.appendChild(c1);
        animateCardIn(c1, 0);
    }

    if (selected2) {
        const c2 = makeCard(selected2, "Coin 2");
        cardsRowEl.appendChild(c2);
        animateCardIn(c2, 120);
    }
}

function showHint(show) {
    if (show) {
        hintEl.style.opacity = "0";
        hintEl.style.transform = "translateY(-6px)";
        anime.animate(hintEl, {
            opacity: [0, 1],
            translateY: [-6, 0],
            duration: 260,
            ease: "outQuad"
        });
    } else {
        anime.animate(hintEl, {
            opacity: [1, 0],
            translateY: [0, -6],
            duration: 220,
            ease: "outQuad",
            onComplete: () => {
                hintEl.style.opacity = "0";
            }
        });
    }
}

function showActions(show) {
    if (show) {
        actionsEl.style.opacity = "0";
        actionsEl.style.transform = "translateY(-6px)";
        anime.animate(actionsEl, {
            opacity: [0, 1],
            translateY: [-6, 0],
            duration: 260,
            ease: "outQuad"
        });
    } else {
        anime.animate(actionsEl, {
            opacity: [1, 0],
            translateY: [0, -6],
            duration: 220,
            ease: "outQuad",
            onComplete: () => {
                actionsEl.style.opacity = "0";
            }
        });
    }
}

function resetSelection() {
    selected1 = null;
    selected2 = null;
    stopPulse();
    showHint(false);
    showActions(false);
    renderCards();
    updateBadgeHighlights();
    statsBoxEl.style.display = "none";
    statsBodyEl.innerHTML = "";
}

function onBadgeClick(coinId) {
    const coin = currentTop.find(c => c.id === coinId) || allCoins.find(c => c.id === coinId);
    if (!coin) return;

    if (selected1 && selected2) {
        resetSelection();
    }

    if (!selected1) {
        selected1 = coin;
        renderCards();
        updateBadgeHighlights();
        showHint(true);
        startPulseForSecondPick();
        return;
    }

    if (selected1 && !selected2) {
        if (coin.id === selected1.id) {
            selected1 = coin;
            renderCards();
            updateBadgeHighlights();
            return;
        }

        selected2 = coin;
        stopPulse();
        showHint(false);
        showActions(true);
        renderCards();
        updateBadgeHighlights();
    }
}

function removeCardsAnimated() {
    const cards = Array.from(document.querySelectorAll(".card"));
    if (cards.length === 0) return;

    anime.animate(cards, {
        opacity: [1, 0],
        translateY: [0, 14],
        scale: [1, 0.98],
        duration: 320,
        ease: "inQuad",
        onComplete: () => {
            resetSelection();
        }
    });
}

removeBtn.addEventListener("click", removeCardsAnimated);

function diffPct(a, b) {
    const aa = safeNum(a);
    const bb = safeNum(b);
    if (aa === null || bb === null) return null;
    if (aa === 0) return null;
    return ((bb - aa) / aa) * 100;
}

function showStats() {
    if (!selected1 || !selected2) return;

    const priceDiff = diffPct(selected1.current_price, selected2.current_price);
    const capDiff   = diffPct(selected1.market_cap, selected2.market_cap);

    const priceLine = (priceDiff === null)
        ? `<div class="infoRow"><b>Price difference</b><span>N/A</span></div>`
        : `<div class="infoRow"><b>Price difference</b><span>${priceDiff.toFixed(2)}%</span></div>`;

    const capLine = (capDiff === null)
        ? `<div class="infoRow"><b>Market cap difference</b><span>N/A</span></div>`
        : `<div class="infoRow"><b>Market cap difference</b><span>${capDiff.toFixed(2)}%</span></div>`;

    statsBodyEl.innerHTML = `
    <div class="infoRow"><b>Coin 1</b><span>${selected1.name}</span></div>
    <div class="infoRow"><b>Coin 2</b><span>${selected2.name}</span></div>
    ${priceLine}
    ${capLine}
  `;

    statsBoxEl.style.display = "block";
    statsBoxEl.style.opacity = "0";
    statsBoxEl.style.transform = "translateY(10px)";
    anime.animate(statsBoxEl, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 260,
        ease: "outQuad"
    });
}

statsBtn.addEventListener("click", showStats);

function applyCriteria() {
    const crit = criteriaEl.value;

    resetSelection();

    currentTop = getTop30By(crit);
    renderBadges();
    renderCharts();
}

criteriaEl.addEventListener("change", applyCriteria);

async function init() {
    try {
        allCoins = await loadData();
        currentTop = getTop30By(criteriaEl.value);
        renderBadges();
        renderCharts();
    } catch (e) {
        badgesWrapEl.innerHTML = `<div class="muted">Failed to load data from CoinGecko.</div>`;
    }
}

init();
