function parseDriver(line) {
    const parts = line.split(";").map(p => p.trim());
    if (parts.length !== 7)
        return null;

    const [first, last, team, l1, l2, l3, l4] = parts;

    const laps = [l1, l2, l3, l4].map(Number);
    if (!first || !last || !team)
        return null;
    if (laps.some(x => !Number.isFinite(x)))
        return null;

    const total = laps.reduce((a, b) => a + b, 0);
    const bestLap = Math.min(...laps);

    return {first, last, team, laps, total, bestLap};
}

document.addEventListener('DOMContentLoaded', () => {
    const outEl = document.getElementById("out");
    const drivers = [];

    while(true){
        const line = prompt("Enter driver (firstname;lastname;team;lap1;lap2;lap3;lap4) or F to finish:");
        if(line === null)
            return;

        const trimmed = line.trim();
        if(trimmed.toUpperCase() === "F")
            break;
        if(!trimmed)
            continue;

        const d = parseDriver(trimmed);
        if(!d){
            alert("Error");
            outEl.textContent = "Error";
            return;
        }
        drivers.push(d);
    }

    if(drivers.length === 0){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    let winner = drivers[0];
    for (const d of drivers){
        if (d.total < winner.total)
            winner = d;
    }

    let fastestLapOverall = drivers[0].bestLap;
    for (const d of drivers){
        if (d.bestLap < fastestLapOverall)
            fastestLapOverall = d.bestLap;
    }

    const winnerHasFastestLap = winner.bestLap === fastestLapOverall;

    const output =
        `${winner.first} ${winner.last} ${winner.team} ${winner.total}\n\n` +
        `Fastest Lap: ${winnerHasFastestLap ? "True" : "False"}`;

    alert(output);
    outEl.textContent = output;
});