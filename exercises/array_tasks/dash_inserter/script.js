        function insertDash(numStr){
            let result = [numStr[0]];
            for(let i = 1; i < numStr.length; ++i){
                if(numStr[i - 1] % 2 === 0 && numStr[i] % 2 === 0){
                    result.push('-', numStr[i]);
                }
                else{
                    result.push(numStr[i]);
                }
            }
            return result.join('')
        }
        let input = prompt("Внесете број");
        if(input){
            console.log(insertDash(input));
        }
        else{
            console.log("Внесовте празен стринг");
        }
