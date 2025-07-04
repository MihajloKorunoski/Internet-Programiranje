        function num_string_range(start, end, step) {
            const result = [];
            if(typeof start === 'number' && typeof end === 'number'){
                if(start <= end){
                    for(let i = start; i <= end; i += step){
                        result.push(i);
                    }
                }
                else {
                    for(let i = start; i >= end; i -= step){
                        result.push(i);
                    }
                }

            }
            else if(typeof start === 'string' && typeof end === 'string'){
                start = start.charCodeAt(0);
                end = end.charCodeAt(0);

                if(start <= end){
                    for(let i = start; i <= end; i += step){
                        result.push(String.fromCharCode(i));
                    }
                }
                else {
                    for(let i = start; i >= end; i -= step){
                        result.push(String.fromCharCode(i));
                    }
                }
            } else {
                return "Невалидни аргументи";
            }
            return result;
        }

        console.log(num_string_range('a', "z", 2)); //=> ["a", "c", "e", "g", "i", "k", "m", "o", "q", "s", "u", "w", "y"]
        console.log(num_string_range("Z", "A", 2)); //=> ["Z", "X", "V", "T", "R", "P", "N", "L", "J", "H", "F", "D", "B"]
        console.log(num_string_range(0, -5, 1)); //=> [0, -1, -2, -3, -4, -5]
        console.log(num_string_range(0, 25, 5)); //=> [0, 5, 10, 15, 20, 25]
        console.log(num_string_range(20, 5, 5)); //=> [20, 15, 10, 5]
