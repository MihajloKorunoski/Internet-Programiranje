        function objectToPairs(obj){
            if(typeof obj !== "object" || obj === null){
                return [];
            }
            return Object.entries(obj);
        }

        let colors = {
            red: '#FF0000',
            green: '#00FF00',
            white: '#FFFFFF',
            black: '#000000',
            blue: '#0000FF',
            yellow: '#FFFF00'
        }
        console.log(objectToPairs(colors));
