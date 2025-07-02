        document.addEventListener('DOMContentLoaded', () => {
            let bg = 0;

            const changeColor = () => {
                bg += 100;
                const hexColor = bg.toString(16).padStart(6, '0');
                document.body.style.backgroundColor = `#${hexColor}`;
                console.log(hexColor);
            }

            setInterval(changeColor, 500)
        })
