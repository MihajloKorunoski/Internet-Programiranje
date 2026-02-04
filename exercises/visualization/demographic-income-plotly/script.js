const demographicData = [
    {
        ageRange: "18-25",
        incomeData: [
            { occupation: "Engineer", avgIncome: 50000, people: 3000 },
            { occupation: "Teacher",  avgIncome: 40000, people: 2000 },
            { occupation: "Student",  avgIncome: 10000, people: 7000 }
        ]
    },
    {
        ageRange: "26-35",
        incomeData: [
            { occupation: "Engineer", avgIncome: 70000, people: 5000 },
            { occupation: "Teacher",  avgIncome: 50000, people: 4000 },
            { occupation: "Doctor",   avgIncome: 90000, people: 3000 },
            { occupation: "Other",    avgIncome: 30000, people: 6000 }
        ]
    },
    {
        ageRange: "36-45",
        incomeData: [
            { occupation: "Engineer", avgIncome: 80000, people: 4000 },
            { occupation: "Teacher",  avgIncome: 55000, people: 3000 },
            { occupation: "Doctor",   avgIncome: 95000, people: 2000 },
            { occupation: "Other",    avgIncome: 40000, people: 6000 }
        ]
    },
    {
        ageRange: "46-60",
        incomeData: [
            { occupation: "Engineer", avgIncome: 85000,  people: 2000 },
            { occupation: "Teacher",  avgIncome: 60000,  people: 3000 },
            { occupation: "Doctor",   avgIncome: 100000, people: 1000 },
            { occupation: "Other",    avgIncome: 35000,  people: 4000 }
        ]
    }
];

function getPopulation(incomeData){
    let population = 0;
    for(const item of incomeData)
        population += item.people;
    return population;
}

function visualizeData(){
    const labels = demographicData.map(g => g.ageRange);
    const values = demographicData.map (g => getPopulation(g.incomeData));

    const pieTrace = {
        type: "pie",
        labels,
        values
    };

    Plotly.newPlot("pieChart", [pieTrace], {
        title: "Population Distribution by Age Group",
        margin: {t: 50, r: 20, b: 20, l: 20}
    }, { responsive: true });



    const bubbleTraces = demographicData.flatMap(group =>
        group.incomeData.map(income => ({
            x: [income.occupation],
            y: [income.avgIncome],
            mode: "markers",
            marker: {
                size: [income.people],
                sizemode: "area",
                sizeref: 30
            },
            name: `${income.occupation} (${group.ageRange})`
        }))
    );

    Plotly.newPlot("bubbleChart", bubbleTraces, {
        title: "Income Distribution by Occupation",
        xaxis: {title: "Occupation"},
        yaxis: {title: "Average Income (USD)"},
        showlegend: true,
        margin: { t: 50, r: 20, b: 60, l: 60 }
    }, {responsive: true})
}

document.addEventListener('DOMContentLoaded', visualizeData)