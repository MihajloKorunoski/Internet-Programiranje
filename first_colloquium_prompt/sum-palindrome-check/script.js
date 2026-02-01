function isValidNumberInput(s){
    return /^-?\d+(\.\d+)?$/.test(s.trim());
}

function isPalindromeNumber(n){
    const s = String(Math.abs(n));
    return s === s.split("").reverse().join("");
}


const aRaw = prompt("Enter the first number:");
if(aRaw !== null){
    const bRaw = prompt("Enter the second number:");
    if(bRaw !== null){

        if(!isValidNumberInput(aRaw) || !isValidNumberInput(bRaw)){
            alert("Warning: You must enter numbers (not symbols/letters).");
        } else {
            const a = Number(aRaw.trim());
            const b = Number(bRaw.trim());

            const sum = a + b;

            if(!Number.isInteger(sum)){
                alert(`Sum is ${sum}. Palindrome check applies to integers only.`);
            } else {
                const pal = isPalindromeNumber(sum);
                alert(`Sum: ${sum}\nPalindrome: ${pal}`);
            }
        }
    }
}