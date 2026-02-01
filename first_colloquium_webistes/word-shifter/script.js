function transformText(input){
    if(/\d/.test(input))
        return null;

    const words = input.trim().split(/\s+/);

    const out = [];

    for(const w of words){
        const lettersOnly = w.replace(/[^a-zA-Z]/g, "");

        if(!lettersOnly)
            continue;

        if(lettersOnly.length <=2){
            out.push(lettersOnly);
        } else {
          out.push(lettersOnly.slice(-2) + lettersOnly.slice(0,-2));
        }
    }
    return out.join(" ");
}


document.addEventListener("DOMContentLoaded", () => {
    const outputEl = document.getElementById("output");

    const input = prompt("Enter a string:");
    if (input === null) {
        outputEl.textContent = "-";
        return;
    }

    const result = transformText(input);

    if(result === null){
        alert("Error");
        outputEl.textContent = "Error";
    } else {
        outputEl.textContent = result;
    }
});