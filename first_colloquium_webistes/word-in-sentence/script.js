function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsWholeWord(sentence, word) {
    const w = word.trim();
    if (!w)
        return false;

    const re = new RegExp(`\\b${escapeRegExp(w)}\\b`, "i")
    return re.test(sentence);
}

document.addEventListener("DOMContentLoaded", () => {
    const sentenceEl = document.getElementById("sentence");
    const wordEl = document.getElementById("word");
    const btn = document.getElementById("checkBtn");
    const resultEl = document.getElementById("result");

    btn.addEventListener("click", () => {
        const found = containsWholeWord(sentenceEl.value, wordEl.value);
        resultEl.textContent = found ? "True" : "False";
    })
})