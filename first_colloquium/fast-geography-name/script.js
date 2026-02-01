const CATEGORIES = ["country", "city", "mountain", "plant", "object"];

function startsWithLetter(word, letter) {
    if (!word)
        return false;

    const w = word.trim();
    if (!w)
        return false;

    return w[0].toLowerCase() === letter.toLowerCase();
}

function parsePlayerLine(line) {
    const parts = line.split(";").map(x => x.trim());

    if (parts.length !== 6)
        return null;

    const [player, country, city, mountain, plant, object] = parts;
    if (!player)
        return null;

    return {
        player,
        words: {country, city, mountain, plant, object}
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const outEl = document.getElementById("out");

    const letterInput = prompt("Enter the starting letter for this round:");
    if (letterInput === null)
        return;

    const letter = letterInput.trim();
    if (letter.length !== 1) {
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const players = [];
    let idx = 0;

    while (true) {
        const line = prompt("Enter player data (player;country;city;mountain;plant;object) or !end!:");
        if (line === null)
            return;

        const trimmed = line.trim();
        if (trimmed === "!end!")
            break;
        if(!trimmed)
            continue;

        const parsed = parsePlayerLine(trimmed);
        if (!parsed){
            alert("Error");
            outEl.textContent = "Error";
            return;
        }

        players.push({...parsed, index: idx++});
    }

    if (players.length === 0){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const countsByCategory = {};
    for (const cat of CATEGORIES)
        countsByCategory[cat] = new Map();

    for (const p of players){
        for (const cat of CATEGORIES){
            const w = p.words[cat].trim();
            if (startsWithLetter(w, letter)){
                const key = w.toLowerCase();
                countsByCategory[cat].set(key, (countsByCategory[cat].get(key) || 0) + 1)
            }
        }
    }

    for (const p of players){

        let score = 0;

        for (const cat of CATEGORIES){
            const w = p.words[cat].trim();

            if(!startsWithLetter(w, letter)){
                score += 0;
                continue;
            }

            const key = w.toLowerCase();
            const count = countsByCategory[cat].get(key) || 0;

            score += (count > 1)? 5 : 10;
        }

        p.score = score;
    }

    players.sort((a,b) => {
        if(b.score !== a.score)
            return b.score - a.score;
        return a.index - b.index;
    });

    console.clear();
    const lines = players.map(p => `${p.player}: ${p.score} points`);
    for(const line of lines)
        console.log(line);

    outEl.textContent = lines.join("\n");
    alert("Done. Check the console for the results.")
})


