document.addEventListener('DOMContentLoaded', () => {
    const ime = document.getElementById("ime");
    const prezime = document.getElementById("prezime");
    const email = document.getElementById("email");
    const vozrast = document.getElementById("vozrast");
    const prati = document.getElementById("prati");
    const poraka = document.getElementById("poraka");

    for(let age = 18; age <= 99; age++){
        const opt = document.createElement("option");
        opt.value = String(age);
        opt.textContent = String(age);
        vozrast.appendChild(opt);
    }
    vozrast.value = "19";

    prati.addEventListener("click", () => {
        const vIme = ime.value.trim();
        const vPrezime = prezime.value.trim();
        const vEmail = email.value.trim();
        const vVozrast = vozrast.value;

        const text =
            `Потврди ги податоците:\n\n` +
            `Име: ${vIme}\n` +
            `Презиме: ${vPrezime}\n` +
            `E-mail: ${vEmail}\n` +
            `Возраст: ${vVozrast}`;

        const ok =  confirm(text);

        if(ok){
            poraka.value = "Podatocite se uspesno isprateni";
        } else {
            poraka.value = ""
        }

    });
})