function parseOrder(line) {
    const parts = line.split("-");
    if (parts.length !== 4) return null;

    const name = parts[0].trim();
    const table = parts[1].trim();
    const drink = parts[2].trim();
    const caloriesStr = parts[3].trim();


    const tableNum = Number(table);
    const calories = Number(caloriesStr);

    if (!name || !drink || !Number.isFinite(tableNum) || !Number.isFinite(calories))
        return null;

    return {name, table: tableNum, drink, calories};
}

function parseQuery(line){
    const parts = line.trim().split(/\s+/);

    if(parts.length < 2)
        return null;

    const maxCalories = Number(parts[parts.length - 1]);
    const drinkName = parts.slice(0, -1).join(" ");

    if(!drinkName || !Number.isFinite(maxCalories))
        return null;

    return {drinkName, maxCalories};
}

document.addEventListener("DOMContentLoaded", () => {
    const outEl = document.getElementById("out");

    const nStr = prompt("Enter n (number of orders):");
    if(nStr === null)
        return;

    const n = Number(nStr.trim());
    if(!Number.isInteger(n) || n < 0){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const orders = [];
    for (let i = 0; i < n; i++){
        const line = prompt(`Enter order ${i + 1} (name-tableNumber-drink-calories):`);

        if(line === null)
            return;

        const order = parseOrder(line);
        if(!order) {
            alert("Error");
            outEl.textContent = "Error";
            return;
        }
        orders.push(order);
    }

    const qLine = prompt("Enter drink name and max calories (example: cocacola 200):");
    if(qLine === null)
        return;

    const query = parseQuery(qLine);
    if(!query){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const targetDrink = query.drinkName.trim().toLowerCase();
    const maxCal = query.maxCalories;

    const matching = orders.filter(o => o.drink.toLowerCase() === targetDrink);
    const allowed = matching.filter(o => o.calories <= maxCal);

    let output = `Orders ${allowed.length}.\n`
    for (const o of allowed){
        output += `\nName: ${o.name} Table: ${o.table} Order: ${o.drink} ${o.calories}`;
    }

    alert(output);
    outEl.textContent = output;
});

