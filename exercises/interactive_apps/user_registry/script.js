    document.addEventListener('DOMContentLoaded', function () {
        const addUserButton = document.getElementById('addButton')
        const userTable = document.querySelector('.user-section table')
        const teacherCountDisplay = document.getElementById('teacherCount')
        let teacherCount = parseInt(teacherCountDisplay.textContent, 10)
        let users = {}

        function initializeUsersTable() {
            userTable.innerHTML = ''
            const headerRow = userTable.insertRow()
            const headerElements = ['Name', 'Username', 'Email', 'Age', 'Role', 'Action']
            headerElements.forEach(text => {
                const headerCell = document.createElement('th')
                headerCell.textContent = text
                headerRow.appendChild(headerCell)
            })
        }

        initializeUsersTable()

        function hireTeacher(username, row) {
            teacherCount--
            teacherCountDisplay.textContent = teacherCount.toString()
            row.style.backgroundColor = 'lightGray'
            row.deleteCell(5)
        }

        function addUserToTable(user) {
            const row = userTable.insertRow(-1)
            row.insertCell(0).textContent = user.name
            row.insertCell(1).textContent = user.username
            row.insertCell(2).textContent = user.email
            row.insertCell(3).textContent = user.age
            row.insertCell(4).textContent = user.role

            if(user.role === 'student'){
                row.style.background = 'lightblue'
            } else  {
                row.style.background = 'lightgreen'
                const actionCell = row.insertCell(5)
                const hireBtn = document.createElement('button')
                hireBtn.textContent = 'Hire'
                hireBtn.onclick = function () {
                    hireTeacher(user.username, row)
                }
                actionCell.appendChild(hireBtn)
            }
        }

        addUserButton.addEventListener('click', function () {
            const name = document.getElementById('name').value.trim()
            const email = document.getElementById('email').value.trim()
            const age = parseInt(document.getElementById('age').value, 10)
            const username = document.getElementById('username').value.trim()
            const password = document.getElementById('password').value
            const role = document.getElementById('role').value


            if (!name || !email || !username || !password || !role) {
                alert('Please fill all fields')
                return
            }

            if (users[username]) {
                alert('Username is already taken.')
                return
            }

            if (password.length > 10 || !password.match(/[A-Z]/) || !password.match(/[0-9]/)) {
                alert('Password must be no longer than 10 characters and include at least one uppercase letter and one number')
                return
            }

            if (role === 'teacher' && age < 18) {
                alert('Teachers must be at least 18 years old')
                return
            }

            const newUser = {name, username, email, age, role}
            users[username] = newUser

            if(role === 'teacher'){
                teacherCount++
                teacherCountDisplay.textContent =teacherCount.toString()
            }

            addUserToTable(newUser)
        })
    })
