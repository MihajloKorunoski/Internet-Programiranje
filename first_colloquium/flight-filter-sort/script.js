function parseFlight(line) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 4)
        return null;

    const from = parts[0];
    const destination = parts[1];
    const durationStr = parts[2];
    const priceStr = parts[3];

    const durationHours = Number(durationStr.replace(/\D/g, ""));

    const price = Number(priceStr.replace(/\D/g, ""));

    if (!from || !destination || !Number.isFinite(durationHours) || !Number.isFinite(price))
        return null;

    return {
        from,
        destination,
        durationStr,
        durationHours,
        priceStr,
        price,
        raw: line.trim()
    };
}

function formatFlight(f) {
    return `${f.from} ${f.destination} ${f.durationStr} ${f.priceStr}`
}

document.addEventListener("DOMContentLoaded", () => {

    const outEl = document.getElementById("out");

    const nStr = prompt("Enter number of flights (n):");
    if (nStr === null)
        return;

    const n = Number(nStr.trim());

    if (!Number.isInteger(n) || n < 0) {
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const flights = [];
    for (let i = 0; i < n; i++) {
        const line = prompt(`Enter flight ${i + 1} (from destination duration price):`)
        if (line === null)
            return;

        const flight = parseFlight(line);
        if (!flight) {
            alert("Error");
            outEl.textContent = "Error";
            return;
        }

        flights.push(flight)
    }

    const destInput = prompt("Enter destination to filter by:");
    if(destInput === null)
        return;
    const targetDest = destInput.trim().toLowerCase();

    const maxDurStr = prompt("Enter maximum duration (hours):");
    if (maxDurStr === null)
        return;
    const maxDuration = Number(maxDurStr.trim());
    if(!Number.isFinite(maxDuration)){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const filtered = flights.filter(f => f.destination.toLowerCase() === targetDest)
        .sort((a,b) => a.price - b.price);

    const allShorter = filtered.every(f => f.durationHours < maxDuration);

    let output = "";
    for(let i = 0; i < filtered.length; i++)
        output += `${i + 1}. ${formatFlight(filtered[i])}\n`

    output += `\nAll flights are shorter than ${maxDuration}h: ${allShorter}`;

    alert(output);
    outEl.textContent = output;
})