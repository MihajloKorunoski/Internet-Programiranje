    document.addEventListener('DOMContentLoaded', (event) => {
        const students = [];
        const formContainer = document.getElementById('form-container');
        const studentsTable = document.getElementById('students-table');
        const submitButton = document.getElementById('submit-button');

        submitButton.addEventListener('click', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const surname = document.getElementById('surname').value;
            const indexNumber = document.getElementById('index-number').value;
            const subject = document.getElementById('subject').value;
            const grade = document.getElementById('grade').value;

            if(name && surname && indexNumber && subject && !isNaN(indexNumber)){
                const student = { name, surname, indexNumber, subject, grade };
                students.push(student);
                addStudentToTable(student);
                resetForm();
            } else {
                alert("Please fill in all fields with valid data!");
            }
        });

        function addStudentToTable(student) {
            const row = studentsTable.insertRow();
            row.innerHTML = `<td>${student.name}</td>
                             <td>${student.surname}</td>
                             <td>${student.indexNumber}</td>
                             <td>${student.subject}</td>
                             <td>${student.grade}</td>`;
        }

        function resetForm() {
            document.getElementById('name').value = '';
            document.getElementById('surname').value = '';
            document.getElementById('index-number').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('grade').selectedIndex = 0;
        }
    });
