        function difference(array1, array2){
            const diff1 = array1.filter(element => !array2.includes(element))
            const diff2 = array2.filter(element => !array1.includes(element))
            return [...diff1, ...diff2]
        }
        console.log(difference([1, 2, 3], [100, 2, 1, 10]));
        console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
        console.log(difference([1, 2, 3], [100, 2, 1, 10]));
