document.addEventListener("DOMContentLoaded", () => {
    const inp = document.getElementById("one");

    inp.focus();

    document.addEventListener("click", () => inp.focus());

    inp.addEventListener("keydown", (e) => {
        const key = e.key;

        const allowed = [
            "Backspace", "Delete", "Tab",
            "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
            "Home", "End", "Shift", "Control", "Alt", "Meta"
        ];

        if(allowed.includes(key))
            return;

        if(key.length === 1){
            e.preventDefault();
            inp.value = key;
        }
    });

    inp.addEventListener("input", () => {
        if(inp.value.length > 1)
            inp.value = inp.value.slice(-1);
    });

    inp.addEventListener("mouseenter", () => {
        const v = inp.value;

        if(!v)
            alert("Field is empty");
        else if (/^\d$/.test(v))
            alert("Last entered digit");
        else if(/^[A-z]$/.test(v))
            alert("Last entered letter");
        else
            alert("Last entered character")
    });
});