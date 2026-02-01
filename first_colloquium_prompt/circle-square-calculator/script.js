const shapeRaw = prompt("Enter shape (circle or square):");

if(shapeRaw === null){
    //cancelled
} else {
    const shape = shapeRaw.trim().toLowerCase();

    if(shape !== "circle" && shape !== "square"){
        alert("Invalid input (must be circle or square).");
    } else {
        const valueRaw = prompt(shape === "circle" ?
        "Enter radius (r):" :
        "Enter side length (a)");

        if(valueRaw === null){
            // cancelled
        } else {
            const val = Number(valueRaw.trim());

            if(!Number.isFinite(val) || val <= 0)
                alert("Invalid number.");
            else {
                let area, perimeter;

                if(shape === "circle"){
                    const r = val;
                    perimeter = 2 * r * Math.PI;
                    area = r * r * Math.PI;
                } else {
                    const a = val;
                    perimeter = 4 * a;
                    area = a * a;
                }

                const bigger = Math.max(area, perimeter);
                const smaller = Math.min(area, perimeter);
                const times = bigger / smaller;

                const biggerName = (area >= perimeter) ? "Area" : "Perimeter";
                const smallerName = (area < perimeter) ? "Area" : "Perimeter";

                alert(
                    `Shape: ${shape}\n` +
                    `Area: ${area.toFixed(2)}\n` +
                    `Perimeter: ${perimeter.toFixed(2)}\n\n` +
                    `${biggerName} is ${times.toFixed(2)} times bigger than ${smallerName}.`
                );
            }
        }
    }
}