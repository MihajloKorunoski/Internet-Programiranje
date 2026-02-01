const choice = confirm("Do you want to enter a number?");

if (!choice){
    alert("You will not enter a number.");
} else {
    const raw = prompt("Enter a number");
    if(raw === null){
        alert("A mistake has happened");
    } else {
        const value = Number(raw.trim());

        if(!Number.isFinite(value) || !Number.isInteger(value)){
            alert("A mistake has happened");
        } else {
            alert(value % 2 === 0 ? "Even" : "Odd")
        }
    }
}