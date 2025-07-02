    document.addEventListener('DOMContentLoaded', () => {
        function setBodyAttr(attr, value){
            if(document.body){
                document.body[attr] = value;
            }
            else{
                alert('Feature not supported in your browser');
            }
        }
        const setLinkColor = (color) => {
            const linkStyleElement = document.getElementById('linkStyle');
            linkStyleElement.textContent = `a, a:link, a:visited, a:hover, a:active, a:focus { color: ${color}; }`;
        };
        document.getElementById('textColor').addEventListener('change', function () {
            setBodyAttr('text', this.value);
        });
        document.getElementById('bgColor').addEventListener('change', function () {
            setBodyAttr('bgColor', this.value);
        });
        document.getElementById('linkColor').addEventListener('change', function() {
            setLinkColor(this.value);
        });
    })
