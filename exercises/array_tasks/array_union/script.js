        function union(array1, array2){
            return [...new Set([...array1, ...array2])] // секој елемент се префрла

        }
        console.log(union([1, 2, 3], [100, 2, 1, 10]));
