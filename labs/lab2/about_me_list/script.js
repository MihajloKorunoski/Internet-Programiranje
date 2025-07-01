  document.addEventListener('DOMContentLoaded', function() {

    document.body.style.fontFamily = 'Arial, sans-serif';

    document.getElementById("name").textContent = "Mihajlo Korunoski";
    document.getElementById("index").textContent = "191082";
    document.getElementById("hometown").textContent = "Krushevo";

    let listItems = document.querySelectorAll("#list li");
    for (let listItem of listItems) {
      listItem.style.backgroundColor = "#ff6b6b";
    }
  });
