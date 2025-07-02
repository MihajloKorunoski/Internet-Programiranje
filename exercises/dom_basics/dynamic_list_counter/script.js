    document.addEventListener('DOMContentLoaded', function() {
        const list = document.getElementById('list');
        const addButton = document.getElementById('addButton');
        const removeButton = document.getElementById('removeButton');
        const counterLabel = document.getElementById('counterLabel');
        let itemCount = list.children.length;

        function addItem() {
            list.insertAdjacentHTML('beforeend', '<li>item</li>');
            updateCounter(true);
        }

        function removeItem() {
            if (list.lastChild) {
                list.removeChild(list.lastElementChild);
                updateCounter(false);
            }
        }

        function updateCounter(increment) {
            itemCount += increment ? 1 : -1;
            counterLabel.innerHTML = itemCount;
            addButton.value = `add${itemCount + 1}`;
        }

        addButton.addEventListener('click', addItem);
        removeButton.addEventListener('click', removeItem);

    });
