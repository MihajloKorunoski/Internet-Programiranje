    function replaceNumbers() {
        let str = document.getElementById("inputString1").value;
        document.getElementById("result1").innerText = str.replace(/\d+/g, function (num) {
            return num >= 32 ? String.fromCharCode(num) : num;
        });
    }


