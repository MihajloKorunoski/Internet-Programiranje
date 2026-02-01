function isFourDigitInteger(n) {
    return Number.isInteger(n) && n >= 1000 && n <= 9999;
}

function digitSum(n) {
    const a = Math.floor(n / 1000);
    const b = Math.floor((n % 1000) / 100);
    const c = Math.floor((n % 100) / 10);
    const d = n % 10;
    return a + b + c + d;
}

function isPalindrome4(n) {
    const a = Math.floor(n / 1000);
    const b = Math.floor((n % 1000) / 100);
    const c = Math.floor((n % 100) / 10);
    const d = n % 10;
    return a === d && b === c;
}

const raw = prompt("Enter a four-digit number (1000-9999):");
if (raw !== null){
    const num = Number(raw.trim());

    if(!isFourDigitInteger(num))
        alert("The entered number cannot be checked (it is not a four-digit number).");
    else {
        const pal = isPalindrome4(num);
        const sum = digitSum(num)
        const divisible = (sum !== 0) && (num % sum === 0);

        alert(
            `Palindrome: ${pal}\nDivisible by sum of digits (${sum})): ${divisible}`
        )
    }
}