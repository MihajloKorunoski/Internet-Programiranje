document.addEventListener("DOMContentLoaded", () =>{
    const MAX = 30;

    const input = document.getElementById("txt");
    const remaining = document.getElementById("remaining");
    const btn = document.getElementById("btn");

    function update(){
        const len = input.value.length;
        remaining.textContent = MAX - len;

        btn.disabled = len > MAX;
    }

    input.addEventListener('input', update);
    update();
})