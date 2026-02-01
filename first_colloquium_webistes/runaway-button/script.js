document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('stage');
    const btn = document.getElementById('btn');

    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomColor() {
        const r = randInt(40, 255);
        const g = randInt(40, 255);
        const b = randInt(40, 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function moveAndRestyle(){
        const stageRect = stage.getBoundingClientRect();

        const w = randInt(90 ,220);
        const h = randInt(36, 90);

        btn.style.width = `${w}px`;
        btn.style.height = `${h}px`;
        btn.style.background = randomColor();

        const maxX = Math.max(0, stageRect.width - w);
        const maxY = Math.max(0, stageRect.height - h);

        const x = randInt(0, Math.floor(maxX));
        const y = randInt(0, Math.floor(maxY));

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.style.transform = "none";
    }

    moveAndRestyle();

    btn.addEventListener('mouseenter', moveAndRestyle)
})