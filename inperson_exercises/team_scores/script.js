      const teams = {}

      while(true){
        const input = prompt("Enter team in format 'ime_na_tim:kod' or '@' to stop:");
        if(input === '@')
          break;
        const [teamName, teamCode] = input.split(':');
        teams[teamCode] = {name: teamName, goalsGiven: 0, goalsReceived: 0};
      }

      while (true){
        const matchInput = prompt("Enter match results in format 'kod1:kod2;gol1:gol2' or '@' to stop:");
        if(matchInput === '@')
          break;

        const [teamCodes, goals] = matchInput.split(';');
        const [teamCode1, teamCode2] = teamCodes.split(':').map(code => code.trim());
        const [goals1, goals2] = goals.split(':').map(Number);

        if(teams[teamCode1]){
          teams[teamCode1].goalsGiven += goals1;
          teams[teamCode1].goalsReceived += goals2;
        }
        if(teams[teamCode2]){
          teams[teamCode2].goalsGiven += goals2;
          teams[teamCode2].goalsReceived += goals1;
        }
      }

      let results = "";
      for (const [code,info] of Object.entries(teams)) {
        results += `${info.name} - Code ${code}, Goals Given: ${info.goalsGiven}, Goals Received: ${info.goalsReceived}\n`;
      }

      alert(results);

