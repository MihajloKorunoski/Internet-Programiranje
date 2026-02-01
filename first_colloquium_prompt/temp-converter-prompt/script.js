const modeRaw = prompt("Convert to (C or F):");

if (modeRaw === null) {
    //cancelled
} else {
    const mode = modeRaw.trim().toUpperCase();

    if (mode !== "C" && mode !== "F") {
        alert("Error");
    } else {
        const tempRaw = prompt("Enter temperature value:");
        if (tempRaw !== null) {
            const value = Number(tempRaw.trim());

            if (!Number.isFinite(value)) {
                alert("Error");
            } else {
                let result;

                if (mode === "F") {
                    result = value * 9 / 5 + 32;
                } else {
                    result = (value - 32) * 5 / 9;
                }

                alert(result);
            }
        }
    }
}
