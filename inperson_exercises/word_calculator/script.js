        const numberWords = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9
        };

        const operations = {
            'plus': '+',
            'minus': '-',
            'times': '*',
            'divided_by': '/'
        };


        const inputField = document.getElementById('equationInput');
        const calculateButton = document.getElementById('calculateButton');

        function calculate(){
            if(calculateButton.textContent === 'CALCULATE'){
                const equation = inputField.value.toLowerCase();
                let parsedEquation = equation;

                for (let [word, number] of Object.entries(numberWords)) {
                    const regex = new RegExp(`\\b${word}\\b`, 'g');
                    parsedEquation = parsedEquation.replace(regex, number);
                }

                for(let [word, symbol] of Object.entries(operations)){
                    const regex = new RegExp(`\\b${word}\\b`, 'g');
                    parsedEquation = parsedEquation.replace(regex, symbol);
                }
                try {
                    const result = eval(parsedEquation);
                    inputField.value = result;
                    calculateButton.textContent = 'Clear value';
                } catch(e){
                    alert('Invalid equation');
                }
            } else {
                inputField.value = '';
                calculateButton.textContent = 'CALCULATE';
            }
        }

