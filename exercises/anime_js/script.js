document.addEventListener("DOMContentLoaded", () => {
    anime.animate(".circle", {
        x: 700,
        scale: 2,
        duration: 2500,
        ease: "linear",
        delay: anime.stagger(200)
    });
});
