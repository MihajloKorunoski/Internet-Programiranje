document.addEventListener("DOMContentLoaded", () => {
    const countEl = document.getElementById("count");
    const typeEl = document.getElementById("type");
    const addBtn = document.getElementById("addBtn");
    const out = document.getElementById("out");

    addBtn.addEventListener("click", () => {
       const raw = countEl.value.trim();

       if(!/^\d+$/.test(raw)){
           alert("Error: Please enter a whole number.");
           return;
       }

       const n = Number(raw);

       out.innerHTML = "";

       const t = typeEl.value;
       const radioName = "generateRadio";

       for(let i = 0; i < n; i++){
           const wrap = document.createElement("label");
           wrap.className = "item";

           const inp = document.createElement("input");
           inp.type = t;
           if(t === "radio")
               inp.name = radioName;

           const txt = document.createTextNode(String(i));

           wrap.appendChild(inp);
           wrap.appendChild(txt)
           out.appendChild(wrap)
       }
    });
});