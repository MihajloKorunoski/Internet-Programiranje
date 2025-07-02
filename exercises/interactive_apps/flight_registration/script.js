    document.addEventListener('DOMContentLoaded', function () {
        cleanFormFields();
        const addFlightButton = document.getElementById('addFlight');
        const flightList = document.querySelector('.flight-list');
        let flights = [];

        function updateTotalFlightsCount() {
            const numberFlightsDisplay = document.getElementById('numberFlights');
            numberFlightsDisplay.textContent = flights.length.toString();
        }
        function addFlightToList(flight) {
            const listItem = document.createElement('li');
            const aircraft = document.getElementById('aircraftType')
            listItem.innerHTML = `
                <div>${flight.name}, ${flight.designationNumber}<div>
                <div>Радиус: ${flight.radius}, Висина: ${flight.height}<div>
                <div>${aircraft.options[aircraft.selectedIndex].text}<div>
                `;

            if(flight.aircraftType === 'drone' && flight.radius !== flight.height){
                listItem.style.border = 'none';
            }

            const confirmButton = document.createElement('button');
            confirmButton.textContent = 'Потврди';

            const rejectButton = document.createElement('button');
            rejectButton.textContent = 'Откажи'

            confirmButton.addEventListener('click', function () {
                flight.confirmed = true;
                listItem.style.background = 'lightgreen';
                confirmButton.disabled = true;
                rejectButton.disabled = true;
            })

            rejectButton.addEventListener('click', function (){
                if(!flight.confirmed){
                    listItem.remove();
                    flights = flights.filter (f => f.designationNumber !== flight.designationNumber);
                    updateTotalFlightsCount();
                }
            })

            const buttonContainer = document.createElement('div');
            buttonContainer.appendChild(confirmButton);
            buttonContainer.appendChild(rejectButton);

            listItem.appendChild(buttonContainer)
            flightList.append(listItem)
        }

        addFlightButton.addEventListener('click', function () {
            const name = document.getElementById('name').value.trim()
            const designationNumber = document.getElementById('designationNumber').value.trim();
            const coordinates = document.getElementById('coordinates').value.trim();
            const radius = parseInt(document.getElementById('radius').value, 10);
            const height = parseInt(document.getElementById('height').value, 10);
            const aircraftType = document.getElementById('aircraftType').value;

            if (!name || !designationNumber || !coordinates || !radius || !height || !aircraftType) {
                alert('Please fill in all the fields.');
                return;
            }
            if (!designationNumber.match(/Z3-UNR-\d{4}/)) {
                alert('The designation number is invalid. It must be in the format Z3-UNR-XXXX');
                return;
            }

            const lastFourDigits = designationNumber.slice(-4);
            const bypassLimits = lastFourDigits === new Array(5).join(lastFourDigits[0]);

            if (!bypassLimits && (radius > 500 || height < 150)) {
                alert('Radius for normal plates must not exceed 500 meters and height must be at least 150 meters');
                return;
            }
            if (flights.some(f => f.designationNumber === designationNumber)) {
                alert('A flight with this designation number already exists.');
                return;
            }

            const newFlight = {name, designationNumber, coordinates, radius, height, aircraftType, confirmed: false}
            flights.push(newFlight);
            addFlightToList(newFlight);
            updateTotalFlightsCount();
            cleanFormFields();
        })

        function cleanFormFields() {
            document.getElementById('name').value = '';
            document.getElementById('designationNumber').value = '';
            document.getElementById('coordinates').value = ''
            document.getElementById('radius').value = ''
            document.getElementById('height').value = ''
            document.getElementById('aircraftType').selectedIndex = 0;
        }
    })
