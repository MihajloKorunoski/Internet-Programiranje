        document.addEventListener('DOMContentLoaded',() => {
            const displayButton = document.getElementById('displayButton');
            displayButton.addEventListener('click',display);

            function display(){
                const radioButtons = document.querySelectorAll('input[type="radio"]');
                let message='';
                for(let radio of radioButtons){
                    message += `${radio.value}: ${radio.checked}\n`;
                }
                alert(message.trim());
            }
        })
