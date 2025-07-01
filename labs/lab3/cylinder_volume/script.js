    document.addEventListener('DOMContentLoaded', () => {
        const calculateButton = document.getElementById('calculateButton');
        calculateButton.addEventListener('click', calculateVolume);

        class Cylinder {
            constructor(height, radius) {
                this.height = height;
                this.radius = radius;
            }

            calculateVolume() {
                return Math.PI * Math.pow(this.radius, 2) * this.height;
            }
        }

        function calculateVolume() {
            const height = parseFloat(document.getElementById('heightInput').value);
            const radius = parseFloat(document.getElementById('radiusInput').value);

            const cylinder = new Cylinder(height, radius);
            const volume = cylinder.calculateVolume();

            document.getElementById('result').innerText = `For height = ${height} and radius = ${radius}, the volume is ${volume.toFixed(2)}`;
        }
    });

