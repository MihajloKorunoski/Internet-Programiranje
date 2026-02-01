document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("cmd");
    const box = document.getElementById("box");


    let x = 0;
    let y = 0;
    const step = 30;

    function render() {
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
    }

    input.addEventListener("keydown", (e) => {
        if (e.key !== "Enter")
            return;

        const cmd = input.value.trim().toLowerCase();

        if (cmd === "right")
            x += step;
        else if (cmd === "left")
            x -= step;
        else if (cmd === "top")
            y -= step;
        else if (cmd === "bottom")
            y += step;
        else {
            alert("Error");
            return;
        }

        render();
        input.value ="";
    });

    render();
})