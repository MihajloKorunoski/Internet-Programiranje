document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".card"));
    const n = cards.length;
    if(!n)
        return;

    cards.forEach((card,i) => {
        card.style.left = `${20 + i * 2}px`;
        card.style.top = `${20 + i * 2}px`;
    });

    const r = cards[0].getBoundingClientRect();
    const centerLeft = (window.innerWidth - r.width) / 2;
    const centerTop = (window.innerHeight - r.height) / 2;

    const gap = 150;
    const startTop = centerTop - ((n - 1) * gap / 2);
    // const startLeft = centerLeft - ((n - 1) * gap / 2);

    const xs = cards.map(card => centerLeft - card.offsetLeft);
    const ys = cards.map((card, i) => (startTop + i * gap) - card.offsetTop);
    //const xs = cards.map((card, i) => (startLeft + i * gap) - card.offsetLeft);
    //const ys = cards.map(card => centerTop - card.offsetTop);

    const moveDuration = 900;
    const moveEvery = 2000;

    const tl = anime.createTimeline();

    tl.add(".card", {
        x: (el,i) => xs[i],
        y: (el,i) => ys[i],
        duration: moveDuration,
        ease: "outQuad",
        delay: anime.stagger(moveEvery)
    });

    tl.add(".card", {
        rotate: "1turn",
        borderRadius: "50%",
        width: "120px",
        height: "120px",
        duration: 900,
        ease: "inOutSine",
        delay: anime.stagger(250)
    }, "+=200");
});