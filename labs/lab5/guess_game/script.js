    document.addEventListener("DOMContentLoaded", function() {
        let tryCount = 0;
        let randomNumber = generateRandomNumber();
        const displayElement = document.getElementById("display");
        const tryCountElement = document.getElementById("tryCount");
        const guessInputElement = document.getElementById("guess");

        function generateRandomNumber() {
            return Math.floor(Math.random() * 9000) + 1000;
        }

        function verifyGuess(number) {
            const numToGuess = String(randomNumber);
            const guessedNum = String(number).padStart(4, '0');
            let onSameSpot = 0, contains = 0;

            guessedNum.split('').forEach((digit, index) => {
                if (numToGuess.includes(digit)) {
                    contains++;
                    if (digit === numToGuess[index]) {
                        onSameSpot++;
                    }
                }
            });

            return [contains, onSameSpot];
        }

        function makeGuess() {
            tryCount++;
            const guess = guessInputElement.value;
            const [contains, onSameSpot] = verifyGuess(guess);

            displayElement.innerHTML += `Има ${contains}, на место ${onSameSpot} ${guess}<br/>`;
            if (guess === randomNumber.toString()) {
                displayElement.innerHTML += "ПОГОДОК!!!";
                tryCount = 10;
            }

            if (tryCount >= 10) {
                displayElement.innerHTML += tryCount === 10 && guess !== randomNumber.toString()
                    ? `Не успеавте да го погодите бројот од 10 обиди. Бројот е ${randomNumber}`
                    : '';
                guessInputElement.disabled = true;
            }

            tryCountElement.textContent = tryCount;
        }

        function resetGame() {
            randomNumber = generateRandomNumber();
            tryCount = 0;
            displayElement.innerHTML = "";
            guessInputElement.disabled = false;
            guessInputElement.value = "";
            tryCountElement.textContent = tryCount;
        }

        document.getElementById("guessBtn").addEventListener("click", makeGuess);
        document.getElementById("resetBtn").addEventListener("click", resetGame);
    });
