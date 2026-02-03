document.addEventListener("DOMContentLoaded", () => {
    const author = document.getElementById("author");
    const project = document.getElementById("project");
    const cost = document.getElementById("cost");
    const addBtn = document.getElementById("addBtn");
    const tbody = document.getElementById("tbody");
    const msg = document.getElementById("msg");
    const totalEl = document.getElementById("total");

    function parseCost(s){
        if(!/^\d+$/.test(s))
            return null;
        return Number(s);
    }

    function updateTotal(){
        let sum = 0;
        for(const tr of tbody.querySelectorAll("tr")){
            const c = Number(tr.dataset.cost);
            if(Number.isFinite(c))
                sum+=c;
        }
        totalEl.textContent = String(sum);
    }

    function clearInputs (){
        author.value = "";
        project.value = "";
        cost.value = "";
        author.focus();
    }

    addBtn.addEventListener("click", () => {
        const a = author.value.trim();
        const p = project.value.trim();
        const cRaw = cost.value.trim();

        if(!a || !p || !cRaw){
            msg.textContent = "Please fill all fields";
            return;
        }

        const c = parseCost(cRaw);
        if(c === null){
            msg.textContent = "Cost must be a whole number (digits only).";
            return;
        }

        msg.textContent = "";

        const tr = document.createElement("tr");
        tr.dataset.cost = String(c);

        const tdA = document.createElement("td");
        tdA.textContent = a;

        const tdP = document.createElement("td");
        tdP.textContent = p;

        const tdC = document.createElement("td");
        tdC.textContent = String(c);

        const tdR = document.createElement("td");
        const rm = document.createElement("button");
        rm.type="button";
        rm.className="removeBtn";
        rm.textContent = "Remove";
        rm.addEventListener("click", () => {
            tr.remove();
            updateTotal();
        });
        tdR.appendChild(rm);

        tr.appendChild(tdA);
        tr.appendChild(tdP);
        tr.appendChild(tdC);
        tr.appendChild(tdR);

        tbody.appendChild(tr);

        updateTotal();
        clearInputs();
    });
    updateTotal();
});