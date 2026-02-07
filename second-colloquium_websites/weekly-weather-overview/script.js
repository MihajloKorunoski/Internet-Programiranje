const weatherData = [
    {
        city: "Skopje",
        week: [
            {day: "Mon", temp: 22, condition: "Sunny"},
            {day: "Tue", temp: 24, condition: "Sunny"},
            {day: "Wed", temp: 21, condition: "Cloudy"},
            {day: "Thu", temp: 20, condition: "Rainy"},
            {day: "Fri", temp: 23, condition: "Sunny"},
            {day: "Sat", temp: 25, condition: "Sunny"},
            {day: "Sun", temp: 24, condition: "Cloudy"}
        ]
    },
    {
        city: "London",
        week: [
            {day: "Mon", temp: 15, condition: "Cloudy"},
            {day: "Tue", temp: 14, condition: "Rainy"},
            {day: "Wed", temp: 13, condition: "Rainy"},
            {day: "Thu", temp: 16, condition: "Cloudy"},
            {day: "Fri", temp: 17, condition: "Sunny"},
            {day: "Sat", temp: 18, condition: "Sunny"},
            {day: "Sun", temp: 16, condition: "Cloudy"}
        ]
    },
    {
        city: "Rome",
        week: [
            {day: "Mon", temp: 26, condition: "Sunny"},
            {day: "Tue", temp: 27, condition: "Sunny"},
            {day: "Wed", temp: 28, condition: "Sunny"},
            {day: "Thu", temp: 26, condition: "Cloudy"},
            {day: "Fri", temp: 25, condition: "Cloudy"},
            {day: "Sat", temp: 29, condition: "Sunny"},
            {day: "Sun", temp: 28, condition: "Sunny"}
        ]
    }
];

const scatterDiv = document.getElementById("scatterChart");
const pieDiv = document.getElementById("pieChart");
const citySelect = document.getElementById("citySelect");

const days = weatherData[0].week.map(d => d.day);

function initDropdown() {
    weatherData.forEach((c, index) => {
        const opt = document.createElement("option");
        opt.value = String(index);
        opt.textContent = c.city;
        citySelect.appendChild(opt);
    });
    citySelect.value = "0";
}

function renderScatterAllCities() {
    const traces = weatherData.map(cityObj => ({
        x: days,
        y: cityObj.week.map(d => d.temp),
        name: cityObj.city,
        type: "scatter",
        mode: "lines+markers"
    }));

    const layout = {
        title: {text: "Daily Temperatures for the Past Week (All Cities)"},
        margin: {t: 60, r: 30, b: 60, l: 60},
        xaxix: {title: "Day"},
        yaxis: {title: "Temperature (°C)"}
    };

    Plotly.react(scatterDiv, traces, layout, {responsive: true});
}

function conditionDistribution(cityObj){
    const counts = {};
    cityObj.week.forEach(d=>{
        counts[d.condition] = (counts[d.condition] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const values = labels.map(l => counts[l]);
    return {labels, values};
}

function renderPie(cityObj){
    const {labels, values} = conditionDistribution(cityObj);

    const trace = {
        labels,
        values,
        type: "pie"
    };

    const layout = {
        title: {text: `Weather Conditions in ${cityObj.city}`},
        margin: {t: 60, r: 30, b: 30, l: 30}
    };

    Plotly.react(pieDiv, [trace], layout, {responsive: true});
}
function renderSelectedCityPie(){
    const idx = parseInt(citySelect.value, 10);
    renderPie(weatherData[idx]);
}

citySelect.addEventListener("change", renderSelectedCityPie)
initDropdown();
renderScatterAllCities();
renderSelectedCityPie();