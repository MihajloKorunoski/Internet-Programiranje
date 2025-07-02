    const studentTable = document.getElementById("studentTable");
    const rows = studentTable.querySelectorAll('tbody tr');

    function markPassed(){
        rows.forEach(row => {
            const points = parseInt(row.cells[1].textContent);
            row.classList.remove('red');
            if(points >= 50){
                row.classList.add('green');
            }
        });
    }

    function markFailed(){
        rows.forEach(row =>{
            const points = parseInt(row.cells[1].textContent);
            row.classList.remove('green');
            if(points < 50){
                row.classList.add('red');
            }
        });
    }

    function clearStyles(){
        rows.forEach(row => {
            row.classList.remove('green','red');
        })
    }


