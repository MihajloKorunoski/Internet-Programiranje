        document.addEventListener("DOMContentLoaded", function() {
            const aInput = document.getElementById("a");
            const bInput = document.getElementById("b");
            const resultContainer = document.getElementById("result");
            const operators = document.querySelectorAll("input[name='oper']");

            function calculate() {
                const a = parseFloat(aInput.value);
                const b = parseFloat(bInput.value);
                if (isNaN(a) || isNaN(b)) {
                    alert("All inputs must be numbers!");
                    return;
                }
                const checkedOperator = [...operators].find(op => op.checked);
                let result;
                switch (checkedOperator.id) {
                    case "plus":
                        result = a + b;
                        break;
                    case "minus":
                        result = a - b;
                        break;
                    case "multiply":
                        result = a * b;
                        break;
                    case "divide":
                        result = a / b;
                        break;
                    case "round":
                        result = Math.round(a);
                        break;
                    case "tan":
                        result = Math.tan(a);
                        break;
                    case "sin":
                        result = Math.sin(a);
                        break;
                    case "cos":
                        result = Math.cos(a);
                        break;
                    case "power":
                        result = Math.pow(a, b);
                        break;
                    default:
                        result = Math.sqrt(a);
                        break;
                }
                resultContainer.innerHTML = result;
            }

            document.querySelector("button").addEventListener("click", calculate);
        });
