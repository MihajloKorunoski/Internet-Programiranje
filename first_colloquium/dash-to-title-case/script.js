function toTitleCaseFromDashes(s){

    const parts = s.split(/-+/).filter(p => p.length > 0);

    const words = parts.map(p => {
        const lower = p.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return words.join(" ");
}

document.addEventListener("DOMContentLoaded", () =>{
    const input = prompt('Enter a dashed sentence (example: first-laboratory-exercise):');
    if (input === null)
        return;

    const result = toTitleCaseFromDashes(input.trim());

    alert(result);
    document.getElementById("out").textContent = result;
})