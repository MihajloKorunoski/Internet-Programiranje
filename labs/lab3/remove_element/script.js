    document.addEventListener('DOMContentLoaded', () => {
        const removeButton = document.getElementById('removeButton');
        removeButton.addEventListener('click', () => {
            const array = document.getElementById('arrayInput').value.split(',').map(item => item.trim());
            const elementToRemove = document.getElementById('elementInput').value.trim();
            const resultArray = removeArrayElement(array, elementToRemove);
            document.getElementById('result').innerText = 'Updated Array: [' + resultArray.join(', ') + ']';
        });

        const removeArrayElement = (array, element) => array.filter(ele => ele !== element);
    });

