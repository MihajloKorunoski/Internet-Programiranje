    document.addEventListener('DOMContentLoaded', function() {
        const removeButton = document.getElementById('removeButton');
        const colorSelect = document.getElementById('colorSelect');

        removeButton.addEventListener('click', function() {
            if (colorSelect.selectedIndex !== -1) {
                console.log(colorSelect.options[colorSelect.selectedIndex].text);
                colorSelect.remove(colorSelect.selectedIndex);
            } else {
                console.log("No color selected");
            }
        });
    });
