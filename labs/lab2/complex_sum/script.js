        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('addButton').addEventListener('click', function() {
                const real1 = parseFloat(document.getElementById("real1").value);
                const imaginary1 = parseFloat(document.getElementById("imaginary1").value);
                const real2 = parseFloat(document.getElementById("real2").value);
                const imaginary2 = parseFloat(document.getElementById("imaginary2").value);

                if (isNaN(real1) || isNaN(imaginary1) || isNaN(real2) || isNaN(imaginary2)) {
                    alert("Please enter valid numbers.");
                    return;
                }

                const sumaReal = real1 + real2;
                const sumaImaginary = imaginary1 + imaginary2;

                document.getElementById("sumaReal").value = sumaReal;
                document.getElementById("sumaImaginary").value = sumaImaginary;
            });
        });
