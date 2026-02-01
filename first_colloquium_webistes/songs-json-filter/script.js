function parseDurationToSeconds(tracktime) {
    const m = tracktime.match(/^(\d+)m(\d+)s$/i);
    if (!m)
        return null;

    const minutes = Number(m[1]);
    const seconds = Number(m[2]);

    if(!Number.isFinite(minutes) || !Number.isFinite(seconds))
        return null;

    return minutes * 60 + seconds;
}

function parseSong(line){

    const parts = line.split('|').map(p => p.trim());
    if(parts.length !== 4)
        return null;

    const [title, artist, yearStr, tracktime] = parts;
    const year = Number(yearStr);

    if(!title || !artist || !Number.isInteger(year) || year <= 0)
        return null;

    const seconds = parseDurationToSeconds(tracktime);
    if (seconds === null)
        return null;

    return {title, artist, year, tracktime, seconds};
}

document.addEventListener("DOMContentLoaded", () => {
    const outEl = document.getElementById("out");

    const nStr = prompt("Enter number of songs (n):");
    if(nStr === null)
        return;

    const n = Number(nStr.trim());
    if(!Number.isInteger(n) || n < 0){
        alert("Error");
        outEl.textContent = "Error";
        return;
    }

    const songs = [];
    for(let i = 0; i < n; i++){
        const line = prompt(`Enter song ${i + 1} (title|artist|year|duration):`);
        if (line === null)
            return;

        const song = parseSong(line);
        if(!song){
            alert("Error");
            outEl.textContent = "Error";
            return;
        }

        songs.push(song);
    }

    const filtered = songs.filter(s => s.seconds > 180);

    filtered.sort((a, b) => a.year - b.year);

    const result = filtered.map(s => ({
        title: s.title,
        artist: s.artist,
        year: s.year,
        tracktime: s.tracktime
    }));

    const json = JSON.stringify(result, null, 2);
    alert(json);
    outEl.textContent = json;
})

