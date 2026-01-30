function isPangram(str){
    if (/\d/.test(str))
        return null;

    const seen = new Set();

    for(const ch of str.toLowerCase()){
        if (ch >= "a" && ch <= "z")
            seen.add(ch);
    }

    return seen.size === 26;
}

document.addEventListener("DOMContentLoaded", () => {
    const outEl = document.getElementById("out");

    const input = prompt("Enter a string to check if it's a pangram:");
    if (input === null)
        return;

    const result = isPangram(input);

    if(result === null){
        alert("Error");
        outEl.textContent = "Error";
    }
    else{
        alert(String(result));
        outEl.textContent = String(result);
    }
})