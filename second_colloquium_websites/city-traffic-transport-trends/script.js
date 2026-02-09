const cityData = [
    {
        city: "Skopje",
        trafficPerYear: {
            2019: 38000,
            2020: 34000,
            2021: 36000,
            2022: 40000,
            2023: 42000
        },
        transport: {car: 65, public: 25, bicycle: 10}
    },
    {
        city: "London",
        trafficPerYear: {
            2019: 55000,
            2020: 50000,
            2021: 52000,
            2022: 58000,
            2023: 60000
        },
        transport: {car: 50, public: 40, bicycle: 10}
    },
    {
        city: "Berlin",
        trafficPerYear: {
            2019: 36000,
            2020: 33000,
            2021: 35000,
            2022: 37000,
            2023: 38000
        },
        transport: {car: 45, public: 35, bicycle: 20}
    }
];

const citySelect = document.getElementById("citySelect");
const lineDiv = document.getElementById("lineChart");
const barDiv = document.getElementById("barChart");

function initDropdown() {
    cityData.forEach((c, index) => {
        const opt = document.createElement("option");
        opt.value = String(index);
        opt.textContent = c.city;
        citySelect.appendChild(opt);
    });
    citySelect.value = "0";
}

function renderLineChart(cityObj) {
    const years = Object.keys(cityObj.trafficPerYear)
        .map(y => Number(y))
        .sort((a, b) => a - b);

    const volumes = years.map(y => cityObj.trafficPerYear[y]);

    const trace = {
        x: years,
        y: volumes,
        type: "scatter",
        mode: "lines+markers",
        name: cityObj.city
    };

    const layout = {
        title: {text: `Average Yearly Traffic Volume in ${cityObj.city}`},
        margin: {t: 70, r: 30, b: 60, l: 70},
        xaxis: {title: "Year"},
        yaxis: {title: "Traffic Volume(vehicles per day)"}
    };

    Plotly.react(lineDiv, [trace], layout, {responsive: true});

}


function renderSelectedCity() {
    const idx = parseInt(citySelect.value, 10);
    renderLineChart(cityData[idx]);
}

function renderGroupedBarChart() {
    const cities = cityData.map(c => c.city);

    const car = cityData.map(c => c.transport.car);
    const pub = cityData.map(c => c.transport.public);
    const bicycle = cityData.map(c => c.transport.bicycle);

    const traces = [
        {x: cities, y: car, type: "bar", name: "Car (%)"},
        {x: cities, y: pub, type: "bar", name: "Public Transport (%)"},
        {x: cities, y: bicycle, type: "bar", name: "Bicycle (%)"}
    ];

    const layout = {
        title: {text: "Transportation Usage by City"},
        barmode: "group",
        margin: {t: 70, r: 30, b: 60, l: 70},
        xaxis: {title: "City"},
        yaxis: {title: "Usage Percentage (%)", range: [0, 100]}
    };

    Plotly.newPlot(barDiv, traces, layout, {responsive: true});
}

citySelect.addEventListener("change", renderSelectedCity);

initDropdown();
renderSelectedCity();
renderGroupedBarChart();