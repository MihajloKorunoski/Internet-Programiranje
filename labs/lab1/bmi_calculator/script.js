    function calculate() {
        let weight = parseFloat(document.getElementById("weight").value)
        let height = parseFloat(document.getElementById("height").value) / 100
        if (isNaN(weight) || isNaN(height)) {
            alert("Мора да внесеш точни броеви!")
            return
        }
        let bmi = weight / Math.pow(height, 2)
        alert(`Твојот BMI е: ${bmi.toFixed(1)}`)
    }
