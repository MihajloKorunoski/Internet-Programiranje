      const raceData = prompt("Enter race data in the format 'id_ime_prezime_trka1_trka2_trkaN;' for each racer");
      const racers = {};

      const entries = raceData.split(';');
      entries.forEach(entry => {
        if (!entry.trim())
          return;

        const parts = entry.split('_');
        const id = parts[0];
        const name = `${parts[1]} ${parts[2]}`;
        const times = parts.slice(3).map(Number);

        if(!racers[name]){
          racers[name] = {totalTime: 0, raceCount: 0};
        }

        racers[name].totalTime += times.reduce((acc,time) => acc + time, 0);
        racers[name].raceCount += times.length;

      });

      let minAverage = Infinity;
      let bestRacer = "";

      for(const [racer, stats] of Object.entries(racers)){
        const averageTime = stats.totalTime/stats.raceCount;

        if(averageTime < minAverage){
          minAverage = averageTime;
          bestRacer = racer;
        }
      }

      alert(`The racer with the lowest average time is ${bestRacer} with average time of ${minAverage.toFixed(2)}`);


