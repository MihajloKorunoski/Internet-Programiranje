        function Circle(radius) {
            this.radius = radius;
            this.area = function () {
                return Math.PI * Math.pow(this.radius, 2)
            }
            this.perimeter = function (){
                return 2 * Math.PI * this.radius;
            }
        }
        let radius = prompt("Внесете радиус на кругот");
        let circle = new Circle(radius);

        console.log("Површината на кругот е: " + circle.area().toFixed(2));
        console.log("Периметарот на кругот е: " + circle.perimeter().toFixed(2));
