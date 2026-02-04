const nbaData = [
    {
        team: "Lakers",
        players: [
            { name: "LeBron James",      position: "Forward", ppg: 27.1, rpg: 7.4 },
            { name: "Anthony Davis",     position: "Forward", ppg: 24.0, rpg: 9.1 },
            { name: "Russell Westbrook", position: "Guard",   ppg: 19.5, rpg: 7.4 },
            { name: "Dennis Schroder",   position: "Guard",   ppg: 12.4, rpg: 3.1 },
            { name: "Dwight Howard",     position: "Center",  ppg: 7.4,  rpg: 8.3 }
        ]
    },
    {
        team: "Warriors",
        players: [
            { name: "Stephen Curry",  position: "Guard",   ppg: 29.3, rpg: 5.4 },
            { name: "Klay Thompson",  position: "Guard",   ppg: 20.4, rpg: 3.6 },
            { name: "Draymond Green", position: "Forward", ppg: 8.4,  rpg: 7.3 },
            { name: "Andrew Wiggins", position: "Forward", ppg: 17.2, rpg: 4.5 },
            { name: "Kevon Looney",   position: "Center",  ppg: 6.1,  rpg: 7.5 }
        ]
    }
];

function getFilteredPlayers(teamObj, position){
    if(position === "All")
        return teamObj.players;
    return teamObj.players.filter(p => p.position === position);
}

function updateVisualization(){
    const position = document.getElementById("positionSelect").value;

    const lakersPlayers = getFilteredPlayers(
        nbaData.find(t => t.team === "Lakers"),
        position
    );

    const warriorsPlayers = getFilteredPlayers(
        nbaData.find(t => t.team === "Warriors"),
        position
    );

    const lakersTrace = {
        x: lakersPlayers.map(p => p.ppg),
        y: lakersPlayers.map(p => p.name),
        name: "Lakers",
        type: "bar",
        orientation: "h",
        marker: {color: "purple"}
    };

    const warriorsTrace = {
        x: warriorsPlayers.map(p => p.ppg),
        y: warriorsPlayers.map(p => p.name),
        name: "Warriors",
        type: "bar",
        orientation: "h",
        marker: {color: "gold"}
    };

    const layout =  {
        title: "NBA Player Stats Comparison",
        barmode: "stack",
        xaxis: {title: "Points Per Game (PPG)"},
        yaxis: {title: "Players", automargin: true},
        height: 700,
        legend: {orientation: "h"},
        margin: { t: 60, r: 20, b: 60, l: 160 }
    };

    Plotly.newPlot("chart",[lakersTrace,warriorsTrace], layout, {responsive: true});
}

document.getElementById("positionSelect").addEventListener("change", updateVisualization);

document.addEventListener("DOMContentLoaded", updateVisualization);