document.addEventListener('DOMContentLoaded', () => {
    const frame = document.getElementById("frame");
    const ball = document.getElementById('ball');
    const btn = document.getElementById('bounceBtn');

    function randInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomColor(){
         const r = randInt(40, 255);
         const g = randInt(40, 255);
         const b = randInt(40, 255);
         return `rgb(${r}, ${g}, ${b})`;
    }

    btn.addEventListener('click', () => {
        const frameRect = frame.getBoundingClientRect();

        const ballSize = 48;

        const maxX = Math.max(0, frameRect.width - ballSize);
        const maxY = Math.max(0, frameRect.height - ballSize);

        const x = randInt(0, Math.floor(maxX));
        const y = randInt(0, Math.floor(maxY));

        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;

        ball.style.setProperty('--ball-color', randomColor());
    })
})