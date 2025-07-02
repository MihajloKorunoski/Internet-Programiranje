        const addHeading = () => {
            const heading = document.createElement('h1');
            const headingText = document.createTextNode('Ќе живее овај народ');
            heading.appendChild(headingText);
            document.body.appendChild(heading);
        }

        document.addEventListener('DOMContentLoaded', addHeading);
