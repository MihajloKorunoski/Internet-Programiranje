const btn = document.getElementById("btn");

function randomColor(){
    const r = Math.floor(80 + Math.random() * 176);
    const g = Math.floor(80 + Math.random() * 176);
    const b = Math.floor(80 + Math.random() * 176);
    return `rgb(${r}, ${g}, ${b})`;
}

function setBackgroundNewColor(){
    document.body.style.backgroundColor = randomColor();
}

function moveButtonRandomly(){
    const vw= window.innerWidth;
    const vh = window.innerHeight;

    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;

    const maxLeft = Math.max(0, vw - bw)
    const maxTop = Math.max(0, vh - bh)

    const left = Math.floor(Math.random() * (maxLeft + 1))
    const top = Math.floor(Math.random() * (maxTop + 1))

    btn.style.transform = "none";
    btn.style.left = left + "px";
    btn.style.top = top + "px";
}

btn.addEventListener("mouseenter", () => {
    setBackgroundNewColor();
});

btn.addEventListener("click", () => {
    btn.style.width = (btn.offsetWidth + 15) + "px";
    btn.style.height = (btn.offsetHeight + 15) + "px";

    moveButtonRandomly();
    setBackgroundNewColor();
});

window.addEventListener("resize", () => {
    if (btn.style.transform !== "none")
        return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const bw = btn.offsetWidth;
    const bh = btn.offsetHeight;

    const currentLeft = parseInt(btn.style.left || "0", 10);
    const currentTop = parseInt(btn.style.top || "0", 10);

    btn.style.left = Math.min(currentLeft, Math.max(0, vw - bw)) + "px";
    btn.style.top = Math.min(currentTop, Math.max(0, vh - bh)) + "px";
})