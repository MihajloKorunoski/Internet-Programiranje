function isStaircaseWord(word){
    if (word.length <=1)
        return true;

    for(let i = 1; i<word.length; i++){
        if(word.charCodeAt(i) <= word.charCodeAt(i-1))
            return false;
    }

    return true;
}

function staircaseWordsJoined(input){
    if(/\d/.test(input))
        return null;

    const words = input.trim().split(/\s+/).filter(Boolean);

    const keep = [];
    for(const w of words){
        if(isStaircaseWord(w))
            keep.push(w);
    }

    return keep.join("_")
}


document.addEventListener('DOMContentLoaded', () =>
{
    const outEl =document.getElementById("out");
    const input = prompt("Enter a string (words separated by spaces):");

    if(input === null)
        return;

    const result = staircaseWordsJoined(input);

    if(result === null){
        alert("Error");
        outEl.textContent = "Error";
    } else {
        alert(result);
        outEl.textContent = result;
    }
});