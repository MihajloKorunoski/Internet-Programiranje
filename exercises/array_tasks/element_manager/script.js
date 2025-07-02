        const elemenets = [];
        const addButton = document.getElementById("addElementButton");
        const displayButton = document.getElementById("displayElementButton");

        function addElement() {
            const elementInput = document.getElementById("elementInput");
            const elementValue = elementInput.value;
            if(elementValue){
                elemenets.push(elementValue);
                elementInput.value = "";
            } else {
                alert("Please enter an element");
            }
        }

        addButton.addEventListener("click", addElement);

        function displayElements() {
            const elementList = document.getElementById("elementList");
            elementList.innerHTML = "<h2>Entered Elements</h2>";
            const ul = document.createElement("ul");
            elemenets.forEach((element, index) => {
                const li = document.createElement("li");
                li.textContent = `Element ${index} = ${element}`;
                ul.appendChild(li)
            });

            elementList.appendChild(ul)
        }

        displayButton.addEventListener("click", displayElements);

