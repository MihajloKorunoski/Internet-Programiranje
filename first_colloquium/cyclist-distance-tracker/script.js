function parseCyclist(line) {

    const parts = line.split(";").map(p => p.trim());
    if (parts.length !== 4)
        return null;

    const [name, brand, speedStr, durStr] = parts;


    const speed = Number(speedStr.replace(/[^\d.]/g, ""));
    const hours = Number(durStr.replace(/[^\d.]/g, ""));

    if (!name || !brand || !Number.isFinite(speed) || !Number.isFinite(hours))
        return null;

    const timeMinutes = Math.round(hours * 60);
    const distance = speed * hours;

    return {name, brand, speed, time: timeMinutes, distance}
}

function compareNames(a, b) {
    const A = a.toLowerCase()
    const B = b.toLowerCase();
    if (A < B)
        return -1;
    if (A > B)
        return 1;
    return 0;
}

document.addEventListener("DOMContentLoaded", () => {
    const outEl = document.getElementById("out");

    const cyclists = [];

    while(true){
        const line = prompt("Enter cyclist (name;brand;speed;duration) or 'end':");
        if(line === null)
            return;

        const trimmed = line.trim();
        if(trimmed.toLowerCase() === "end")
            break;
        if(!trimmed)
            continue;

        const c = parseCyclist(trimmed);
        if(!c){
            alert("Error");
            outEl.textContent = "Error";
            return;
        }

        cyclists.push(c);
    }

    if(cyclists.length === 0){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    let best = cyclists[0];
    for(const c of cyclists){
        if(c.distance > best.distance)
            best = c;
        else if (c.distance === best.distance)
            if(compareNames(c.name, best.name) < 0)
                best = c;
    }

    const result = {
        name: best.name,
        brand: best.brand,
        speed: best.speed,
        time: best.time,
        distance: Number(best.distance.toFixed(10))
    }

    const json = JSON.stringify(result, null, 2);
    alert(json);
    outEl.textContent = json;
});