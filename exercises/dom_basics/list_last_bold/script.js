        document.addEventListener('DOMContentLoaded', () => {
            const elements = document.querySelectorAll('ul > li:last-child');
            elements.forEach(element =>{
                alert(element.textContent);
            })
        })
