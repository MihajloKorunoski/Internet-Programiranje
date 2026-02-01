document.addEventListener('DOMContentLoaded', () => {
    const box = document.getElementById('box');

    let x = 50;
    let y = 80;
    const step = 12;

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function render() {
        box.style.left = `${x}px`;
        box.style.top = `${y}px`;
    }

    document.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        if (!["w", "a", "s", "d"].includes(key))
            return;

        e.preventDefault();

        const rect = box.getBoundingClientRect();
        const boxW = rect.width;
        const boxH = rect.height;

        if (key === "w")
            y -= step;
        if (key === "s")
            y += step;
        if (key === "a")
            x -= step;
        if (key === "d")
            x += step;

        const maxX = window.innerWidth -boxW;
        const maxY = window.innerHeight -boxH;

        x = clamp(x, 0, maxX);
        y = clamp(y, 0, maxY);

        render();
    });

    render();
})