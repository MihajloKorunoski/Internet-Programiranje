    document.addEventListener('DOMContentLoaded',function (){
        const elem = document.getElementById('myAnimation');
        let pos = 0;
        const id = setInterval(frame, 5);

        function frame(){
            if(pos > 350){
                clearInterval(id);
            }
            else
            {
                pos++;
                elem.style.top = pos + 'px';
                elem.style.left = pos + 'px';
            }

        }
    })
