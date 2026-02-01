document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("num");
    const out = document.getElementById("out");

    function update() {
        const raw = input.value;

        if(raw === ""){
            out.textContent = "-";
            return;
        }

        const n = Number(raw);
        if(!Number.isFinite(n) || !Number.isInteger(n)) {
            out.textContent = "Enter an integer";
            return;
        }

        out.textContent = (n % 2 === 0) ? "Even" : "Odd";
    }

    input.addEventListener("input", update);
    update();
})