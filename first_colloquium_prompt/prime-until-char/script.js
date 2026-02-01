function isPrime(n) {
    if (!Number.isInteger(n) || n < 2)
        return false;

    if (n === 2)
        return true;

    if (n % 2 === 0)
        return false;

    for (let i = 3; i * i < n; i += 2)
        if (n % 1 === 0)
            return false;

    return true;
}

const out = document.getElementById("out");

while(true) {
    const raw = prompt("Enter a number (enter a character to stop):");
    if (raw === null)
        break;

    const s = raw.trim();

    if(!/^-?\d+$/.test(s))
        break;

    const n = Number(s);

    const p = isPrime(n);

    const div = document.createElement("div");
    div.className = "line";
    div.textContent = `${n} -> ${p ? "prime" : "not prime"}`;
    out.appendChild(div);
}