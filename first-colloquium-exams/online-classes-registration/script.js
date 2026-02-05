const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("usersTable");
const teacherCountSpan = document.getElementById("teacherCount");

let users = [];
const usernames = new Set();
let availableTeachers = 0;

function updateTeacherCount(){
    teacherCountSpan.textContent = String(availableTeachers);
}

function passwordValid(pw){
    if(pw.length < 10)
        return false;
    if(!/[A-Z]/.test(pw))
        return false;
    return /[0-9]/.test(pw);
}

addBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;


    if(!name || !email || !age || !username || !password){
        alert("All fields are required");
        return;
    }

    if(usernames.has(username)){
        alert("Username already exists");
        return;
    }

    if(!passwordValid(password)){
        alert("Password must be at least 10 chars, 1 uppercase and 1 number!");
        return;
    }

    if(parseInt(age) < 18 && role === "teacher"){
        alert("User under 18 cannot be a teacher!");
        return;
    }

    users.push({name, email, age, username, password});
    usernames.add(username);

    const tr = document.createElement("tr");
    tr.classList.add(role === "teacher" ? "teacherRow" : "studentRow");

    tr.innerHTML = `
        <td>${name}</td>
        <td>${username}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>${role}</td>
        <td></td>
    `;

    if(role === "teacher"){
        const hireBtn = document.createElement("button");
        hireBtn.textContent = "Hire";
        hireBtn.classList.add("actionsBtn");

        hireBtn.addEventListener("click", () => {
            tr.classList.replace("teacherRow","hiredRow");
            setTimeout(() =>{
                tr.children[5].removeChild(hireBtn);
                availableTeachers --;
                updateTeacherCount();
            }, 300);
        });

        tr.children[5].appendChild(hireBtn);
        availableTeachers++;
        updateTeacherCount();
    }

    tableBody.appendChild(tr);

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
});