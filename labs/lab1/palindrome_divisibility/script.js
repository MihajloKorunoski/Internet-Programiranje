    while (true) {
        let number = prompt("Внеси четирицифрен број:")

        if (number === null){
            alert("Операцијата е откажана")
            break
        }
        while (number.length !== 4 || isNaN(parseInt(number))) {
            alert("Мора да внесеш четирицифрен број!!!")
            number = prompt("Внеси четирицифрен број:")

            if (number === null){
                alert("Операцијата е откажана")
                break
            }
        }

        let palindromeString = ""

        if (checkPalindrome(number)) {
            palindromeString = "Бројот е палиндром"
        } else {
            palindromeString = "Бројот не е палиндром"
        }

        if (checkDivide(number)){
            alert(`${palindromeString} и се дели со збирот на неговите цифри`)
        } else {
            alert(`${palindromeString} и не се дели со збирот на неговите цифри`)
        }

    }
    function checkPalindrome(num) {
        let reversed = num.split('').reverse().join('')
        return num === reversed
    }
    function checkDivide(num){
        let denominator = 0
        for(let n of num){
            denominator += parseInt(n)
        }
        return num % denominator === 0
    }
