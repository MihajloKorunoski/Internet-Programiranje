    document.addEventListener('DOMContentLoaded', () => {
        const displayButton = document.getElementById('display-button');
        const typeSelector = document.getElementById('type-selector');
        let lastType = typeSelector.value;

        displayButton.addEventListener('click', () => {

            if (typeSelector.value !== lastType) {
                document.getElementById('options-container').innerHTML = '';
                lastType = typeSelector.value;
            }
            generateOptions();
        });
    });

    function generateOptions() {
        const itemsInput = document.getElementById('items-input').value;
        const typeSelector = document.getElementById('type-selector').value;
        const optionsContainer = document.getElementById('options-container');

        const items = itemsInput.split(',')
            .map(item => item.trim())
            .filter(item => item !== '');

        items.forEach((item, index) => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = typeSelector;
            optionInput.id = typeSelector + '-' + item;
            optionInput.name = typeSelector === 'radio' ? 'radio-group' : 'checkbox-group';
            optionInput.value = item;
            optionLabel.appendChild(optionInput);
            optionLabel.append(item);
            optionsContainer.appendChild(optionLabel);
        });

        document.getElementById('items-input').value = '';
    }
