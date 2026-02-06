const students = [
    {
        name: "Marko",
        scores: {
            Math: 85,
            Physics: 78,
            Programming: 92,
            Databases: 88
        }
    },
    {
        name: "Jana",
        scores: {
            Math: 70,
            Physics: 65,
            Programming: 75,
            Databases: 72
        }
    },
    {
        name: "Stefan",
        scores: {
            Math: 90,
            Physics: 88,
            Programming: 95,
            Databases: 91
        }
    }
];

const barDiv = document.getElementById("barChart");
const lineDiv = document.getElementById("lineChart");
const studentSelect = document.getElementById("studentSelect");

const subjects = Object.keys(students[0].scores);

function computeAverages(){
    return subjects.map(sub =>
        students.reduce((sum, s) => sum + s.scores[sub], 0) / students.length);
}

function renderBarChart(){
    const avgScores = computeAverages();

    const trace = {
        x: subjects,
        y: avgScores,
        type: "bar"
    }

    const layout = {
        title: {text: "Average Score per Subject (All Students)"},
        margin: { t: 60, r: 30, b: 60, l: 60 },
        xaxis: {title: "Subject"},
        yaxis: {title: "Average Score", range: [0, 100]}
    }
    Plotly.newPlot(barDiv, [trace], layout, {responsive: true});
}

function renderLineChart(student){
    const y = subjects.map(sub => student.scores[sub]);

    const trace = {
        x: subjects,
        y,
        type: "scatter",
        mode: "lines+markers"
    };
    const layout = {
        title: {text: `Scores for ${student.name}`},
        margin: {t: 60, r: 30, b: 60, l: 60},
        xaxis: {title: "Subject"},
        yaxis: {title: "Score, range: [0,100]"}
    }

    Plotly.react(lineDiv, [trace], layout, {responsive: true});
}

function initDropdown(){
    students.forEach((s,idx) => {
        const opt = document.createElement("option");
        opt.value = String(idx);
        opt.textContent = s.name;
        studentSelect.appendChild(opt);
    });
    studentSelect.value = "0";
}
function renderSelected(){
    const idx = parseInt(studentSelect.value, 10);
    renderLineChart(students[idx]);
}

studentSelect.addEventListener("change", renderSelected);

initDropdown();
renderBarChart();
renderSelected();