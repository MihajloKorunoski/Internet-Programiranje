    document.addEventListener('DOMContentLoaded', function() {
        const changeButton = document.getElementById('changeButton');
        const colorOption = document.getElementById('colorOption');
        const valueInput = document.getElementById('valueInput');

        changeButton.addEventListener('click', function() {
            const value = valueInput.value.trim();
            if (colorOption.checked) {
                document.body.style.backgroundColor = value;
                document.body.style.backgroundImage = '';
            } else {
                document.body.style.backgroundImage = `url(${value})`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundPosition = 'center center';
            }
        });
    });
