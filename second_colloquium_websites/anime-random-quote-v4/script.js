const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("btn");

let isBusy = false;

async function fetchQuote(){
    const res = await fetch("https://dummyjson.com/quotes/random");
    if(!res.ok)
        throw new Error("Fetch Failed");
    return res.json();
}

function playAnimations(){
    quoteEl.style.opacity = "0";
    quoteEl.style.transform = "translateY(-40px) scale(0.9)";
    authorEl.style.opacity = "0";

    anime.animate(quoteEl, {
        opacity: [0,1],
        y: [-40, 0],
        scale: [0.9, 1],
        duration: 700,
        ease: "outBack"
    })
        .then(() => anime.animate(authorEl, {
            opacity: [0, 1],
            duration: 500,
            ease: "outQuad"
        }));
}

async function loadNewQuote(){
    if(isBusy)
        return;
    isBusy = true;
    btn.disabled = true;

    btn.textContent ="Loading...";

    try {
        const data = await fetchQuote();
        quoteEl.textContent = `"${data.quote}"`;
        authorEl.textContent= `- ${data.author}`;
        playAnimations();
    } catch (e){
        quoteEl.textContent = "Could not load quote. Try again."
        authorEl.textContent = "";
    } finally {
        btn.textContent = "New Quote";
        btn.disabled = false;
        isBusy = false;
    }
}

btn.addEventListener("click", loadNewQuote);

loadNewQuote();