const employeeData = [
    {
        name: "Alice",
        level: "Senior",
        earnings: [
            { month: "January", amount: 4000 },
            { month: "February", amount: 4200 },
            { month: "March", amount: 4500 },
            { month: "April", amount: 4800 },
            { month: "May", amount: 5000 },
            { month: "June", amount: 5100 },
            { month: "July", amount: 5300 },
            { month: "August", amount: 5200 },
            { month: "September", amount: 5000 },
            { month: "October", amount: 4900 },
            { month: "November", amount: 4800 },
            { month: "December", amount: 4700 }
        ]
    },
    {
        name: "Charlie",
        level: "Senior",
        earnings: [
            { month: "January", amount: 3000 },
            { month: "February", amount: 3200 },
            { month: "March", amount: 3300 },
            { month: "April", amount: 3400 },
            { month: "May", amount: 3600 },
            { month: "June", amount: 3700 },
            { month: "July", amount: 3800 },
            { month: "August", amount: 3900 },
            { month: "September", amount: 4000 },
            { month: "October", amount: 4100 },
            { month: "November", amount: 4200 },
            { month: "December", amount: 4300 }
        ]
    },
    {
        name: "Bob",
        level: "Junior",
        earnings: [
            { month: "January", amount: 1500 },
            { month: "February", amount: 1600 },
            { month: "March", amount: 1700 },
            { month: "April", amount: 1800 },
            { month: "May", amount: 1900 },
            { month: "June", amount: 2000 },
            { month: "July", amount: 2100 },
            { month: "August", amount: 2200 },
            { month: "September", amount: 2300 },
            { month: "October", amount: 2400 },
            { month: "November", amount: 2500 },
            { month: "December", amount: 2600 }
        ]
    },
    {
        name: "Sarah",
        level: "Junior",
        earnings: [
            { month: "January", amount: 1800 },
            { month: "February", amount: 1900 },
            { month: "March", amount: 2000 },
            { month: "April", amount: 2100 },
            { month: "May", amount: 2200 },
            { month: "June", amount: 2300 },
            { month: "July", amount: 2400 },
            { month: "August", amount: 2500 },
            { month: "September", amount: 2600 },
            { month: "October", amount: 2700 },
            { month: "November", amount: 2800 },
            { month: "December", amount: 2900 }
        ]
    }
];

function visualizeData(level){
    let filtered = employeeData;

    if(level)
        filtered = employeeData.filter(e => e.level === level);

    const traces = filtered.map(e => ({
        x: e.earnings.map(p => p.month),
        y: e.earnings.map(p => p.amount),
        type: "scatter",
        mode: "lines+markers",
        name: e.name
    }));

    const layout = {
        margin: {t: 20, r: 20, b: 80, l: 60},
        xaxis: { tickangle: 35},
        yaxis: { title: "Earnings"},
        legend: { orientation: "v"}
    }

    Plotly.newPlot("container", traces, layout, {responsive: true});
}



document.getElementById("allBtn").addEventListener("click", () => visualizeData(null));
document.getElementById("seniorBtn").addEventListener("click", () => visualizeData("Senior"));
document.getElementById("juniorBtn").addEventListener("click", () => visualizeData("Junior"));

visualizeData(null);