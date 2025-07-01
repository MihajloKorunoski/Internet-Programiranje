    document.addEventListener('DOMContentLoaded', function() {
        const removeButton = document.getElementById('removeButton');
        removeButton.addEventListener('click', removeDuplicates);

        function removeDuplicates() {
            let inputArray = document.getElementById('arrayInput').value.split(',');
            inputArray = inputArray.map(item => item.trim()); // Trim whitespace

            const uniqueArray = inputArray.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });

            document.getElementById('result').innerText = 'Unique Array: [' + uniqueArray.join(', ') + ']';
        }
    });
