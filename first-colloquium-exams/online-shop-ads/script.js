const sellerEl = document.getElementById("seller");
const itemEl = document.getElementById("item");
const codeEl = document.getElementById("code");
const descEl = document.getElementById("desc");
const priceEl = document.getElementById("price");
const usedEl = document.getElementById("used");

const addBtn = document.getElementById("addBtn");
const unusedBody = document.querySelector("#unusedTable tbody");
const usedBody = document.querySelector("#usedTable tbody");

const activeCountEl = document.getElementById("activeCount");

const usedCodes = new Set();
let activeCount = 0;


function updateActiveCount() {
    activeCountEl.textContent = String(activeCount)
}

function catalogNumberFromCode(code) {
    return code.replace(/[0-9!]/g, "");
}

function isValidPrice(raw) {
    const num = Number(raw);
    return Number.isFinite(num) && num > 0;
}

function showError(msg) {
    alert(msg);
}

function addRowToTable(tbody, data) {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = data.seller;

    const tdItem = document.createElement("td");
    tdItem.textContent = data.item;

    const tdPrice = document.createElement("td");
    tdPrice.textContent = data.priceWithFee;

    const tdCode = document.createElement("td");
    tdCode.textContent = data.code;

    const tdNumber = document.createElement("td");
    tdNumber.textContent = data.catalogNumber;


    const tdActions = document.createElement("td");
    const soldBtn = document.createElement("button");
    soldBtn.textContent = "Sold";

    soldBtn.addEventListener("click", () => {
        tr.classList.add("soldRow");

        soldBtn.remove();
        activeCount--;
        updateActiveCount();
    });

    tdActions.appendChild(soldBtn);

    tr.appendChild(tdName);
    tr.appendChild(tdItem);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCode);
    tr.appendChild(tdNumber);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);

    activeCount++;
    updateActiveCount();
}

addBtn.addEventListener("click", () => {
    const seller = sellerEl.value.trim();
    const item = itemEl.value.trim();
    const code = codeEl.value.trim();
    const desc = descEl.value.trim();
    const priceRaw = priceEl.value.trim();
    const usedValue = usedEl.value;

    if (!seller || !item || !code || !desc || !priceRaw) {
        showError("Error: All fields must be filled.");
        return;
    }

    if (usedCodes.has(code)) {
        showError("Error: An item with that code already exists");
        return;
    }

    if (!isValidPrice(priceRaw)) {
        showError("Error: Price must be a number greater than 0.");
        return;
    }

    const basePrice = Number(priceRaw);

    const priceWithFee = (basePrice * 1.10).toFixed(2);

    const catalogNumber = catalogNumberFromCode(code);

    usedCodes.add(code);

    const rowData = {
        seller,
        item,
        code,
        catalogNumber,
        priceWithFee
    };

    if (usedValue === 'never-used')
        addRowToTable(unusedBody, rowData);
    else
        addRowToTable(usedBody, rowData);
});