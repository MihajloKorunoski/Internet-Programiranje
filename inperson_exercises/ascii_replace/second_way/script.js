  function replaceNumbers() {
    let str = prompt("Enter a string with numbers (e.g., Hello32world):");
    if (str) {
      let result = str.replace(/\d+/g, function(num) {
        return parseInt(num) >= 32 ? String.fromCharCode(num) : num;
      });
      alert("Result: " + result);
    } else {
      alert("No input provided.");
    }
  }

  replaceNumbers();


