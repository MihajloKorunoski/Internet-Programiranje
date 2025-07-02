        function first(array, n) {
            if (n == null)
                return array[0];
            if (n < 0 || array.length === 0)
                return [];

            return array.slice(0, n);
        }
        console.log(first([],3));
        console.log(first([7, 9, 0, -2],3));
        console.log(first([7, 9, 0, -2],6));
        console.log(first([7, 9, 0, -2],-3));
