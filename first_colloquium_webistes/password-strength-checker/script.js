function strengthOf(pwd){
    const len = pwd.length;

    const hasUpper = /[A-Z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSign = /[^a-zA-Z0-9]/.test(pwd);

    if(len <= 4)
        return "Weak";

    if(len > 7 && (hasUpper || hasDigit) && hasSign)
        return "Strong";

    if(hasUpper || hasDigit)
        return "Medium"

    return "Weak";
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pwd");

    const weakEl = document.getElementById("weak");
    const medEl = document.getElementById("medium");
    const strongEl = document.getElementById("strong");

   function setActive(level){
       weakEl.classList.remove("active", "weak");
       medEl.classList.remove("active", "medium");
       strongEl.classList.remove("active", "strong");

       if(level === "Weak"){
           weakEl.classList.add("active", "weak");
       }

       if(level === "Medium"){
           medEl.classList.add("active", "medium");
       }

       if(level === "Strong"){
           strongEl.classList.add("active", "strong");
       }
   }

   function update(){
       const level = strengthOf(input.value);
       setActive(level);
   }

   input.addEventListener("input", update);

   input.addEventListener("keydown", (e) => {
       if(e.key === "Enter"){
           const level = strengthOf(input.value);
           alert(level);
       }
   });

   update();

});