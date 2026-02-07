const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const btn = document.getElementById("btn");

const {animate} = anime;

let busy = false;
let typingAnim = null;
let fadeAnim = null;

async function fetchJoke() {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    if (!res.ok)
        throw new Error("Fetch failed");
    return res.json();
}

function resetUI() {
    if (typingAnim && typeof typingAnim.cancel === "function")
        typingAnim.cancel();
    if (fadeAnim && typeof fadeAnim.cancel === "function")
        fadeAnim.cancel();

    typingAnim = null;
    fadeAnim = null;

    setupEl.textContent = "";
    punchlineEl.textContent = "";
    punchlineEl.style.opacity = "0";
}

function typewriterAnime(el, text, msPerChar = 35) {
    if (typingAnim && typeof typingAnim.cancel === "function")
        typingAnim.cancel();

    el.textContent = "";
    const state = {i: 0};

    return new Promise(resolve => {
        typingAnim = animate(state, {
            i: text.length,
            duration: text.length * msPerChar,
            ease: "linear",
            onUpdate: () => {
                el.textContent = text.slice(0, Math.floor(state.i))
            },
            onComplete: () => {
                el.textContent = text;
                typingAnim = null;
                resolve();
            }
        });
    });
}

function fadeInPunchline(text) {
    if (fadeAnim && typeof fadeAnim.cancel === "function") fadeAnim.cancel();

    punchlineEl.textContent = text;
    punchlineEl.style.opacity = "0";

    return animate(punchlineEl, {
        opacity: [0, 1],
        duration: 500,
        ease: "outQuad",
        onComplete: () => {
            fadeAnim = null
        }
    });
}

async function showJoke(setup, punchline){
    resetUI();
    await typewriterAnime(setupEl, setup, 35);
    fadeInPunchline(punchline)
}

async function loadNewJoke(){
    if (busy)
        return;
    busy = true;

    btn.disabled = true;
    btn.textContent = "Loading...";

    try{
        const data = await fetchJoke();
        await showJoke(data.setup, data.punchline);
    } catch(e) {
        resetUI();
        setupEl.textContent = "Could not load joke. Try again.";
    } finally {
        btn.textContent = "Fetch new joke";
        btn.disabled = false;
        busy = false;
    }
}

btn.addEventListener("click",loadNewJoke);
loadNewJoke();
