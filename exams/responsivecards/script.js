document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cardsContainer');
  const totalSoldDisplay = document.getElementById('totalSold');
  const filterColor = document.getElementById('filterColor');
  const form = document.getElementById('cardForm');

  let totalSold = 0;
  const cards = {};

  function sellCard(id) {
    totalSold += cards[id].price;
    totalSoldDisplay.textContent = totalSold.toFixed(2);
    delete cards[id];
    renderCards();
  }

  function renderCards() {
    cardsContainer.innerHTML = '';
    const filter = filterColor.value;

    Object.entries(cards).forEach(([id, card]) => {
      if (filter !== 'all' && card.color !== filter) return;
      const div = document.createElement('div');
      div.className = 'card';
      div.style.backgroundColor = card.color;
      div.style.color = card.color === 'yellow' ? '#333' : '#fff';
      div.style.width = `${card.width}px`;
      div.style.height = `${card.height}px`;

      const content = document.createElement('div');
      content.className = 'card-content';
      content.innerHTML = `
        <p>ID: ${id}</p>
        <p>User: ${card.username}</p>
        <p>${card.width} x ${card.height}</p>
        <p>Price: ${card.price.toFixed(2)}</p>
      `;

      const btn = document.createElement('button');
      btn.textContent = 'Sell';
      btn.addEventListener('click', () => sellCard(id));

      div.appendChild(content);
      div.appendChild(btn);
      cardsContainer.appendChild(div);
    });
  }

  function addOrUpdateCards(username, id, width, height, color) {
    if (!username || !id || isNaN(width) || isNaN(height) || !color) {
      alert('All fields must be filled correctly.');
      return;
    }
    if (!/^[a-z]+$/.test(id)) {
      alert('ID must consist of lowercase letters only.');
      return;
    }
    if (width <= 0 || width > 500 || height <= 0 || height > 500) {
      alert('Width and Height must be between 1 and 500.');
      return;
    }
    let price = width * height * 0.5;
    if (color === 'red') price += 1000;
    cards[id] = { username, width, height, color, price };
    renderCards();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const id = document.getElementById('id_input').value.trim();
    const width = parseInt(document.getElementById('width').value, 10);
    const height = parseInt(document.getElementById('height').value, 10);
    const color = document.getElementById('color').value;
    form.reset();
    addOrUpdateCards(username, id, width, height, color);
  });

  filterColor.addEventListener('change', renderCards);
});
