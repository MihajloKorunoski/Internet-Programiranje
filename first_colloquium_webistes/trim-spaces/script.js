document.addEventListener('DOMContentLoaded', () => {
    const input = prompt("Enter a string:");
    if(input === null)
        return;

    const cleaned = input.replace(/\s+/g, " ");
    alert(cleaned);
    document.getElementById("out").textContent = cleaned;
})