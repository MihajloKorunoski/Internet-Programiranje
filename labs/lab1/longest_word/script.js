    let string1 = prompt("Внеси прв стринг:")
    let string2 = prompt("Внеси втор стринг:")
    let string3 = prompt("Внеси трет стринг:")

    let combinedString = string1 + " " + string2 + " " + string3

    let longestWord = combinedString.split(/\s+/).reduce((longest, current) => {
        return current.length > longest.length ? current : longest
    }, '')

    alert(`Најдолг е зборот: ${longestWord}`)
