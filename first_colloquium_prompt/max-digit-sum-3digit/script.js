function isThreeDigitInteger(n) {
    return Number.isInteger(n) && n >= 100 && n <= 999;
}

function digitSum3(n) {
    const a = Math.floor(n / 100);
    const b = Math.floor((n % 100) / 10);
    const c = n % 10;
    return a + b + c;
}

let bestNumber = null;
let bestSum = -1;

for (let i = 1; i <= 5; i++) {
    const raw = prompt(`Enter 3-digit number ${i} of 5`);
    if (raw === null) {
        bestNumber = null;
        break;
    }
    const value = Number(raw.trim());

    if(!isThreeDigitInteger(value)){
        alert("Error: All entered values must be three-digit number (100-999)..");
        bestNumber = null;
        break;
    }

    const s = digitSum3(value);

    if(s > bestSum){
        bestSum = s;
        bestNumber = value;
    }
}

if(bestNumber !== null){
    alert(`Number with the largest sum of digits: ${bestNumber}`);
}