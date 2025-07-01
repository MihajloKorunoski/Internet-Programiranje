  document.addEventListener('DOMContentLoaded', () => {
    class Book {
      constructor(title, author, alreadyRead) {
        this.title = title;
        this.author = author;
        this.alreadyRead = alreadyRead;
      }
    }

    const addButton = document.getElementById('addButton');
    addButton.addEventListener('click', addBookToList);

    function addBookToList() {
      const title = document.getElementById('titleInput').value;
      const author = document.getElementById('authorInput').value;
      const alreadyRead = document.getElementById('readInput').checked;

      const newBook = new Book(title, author, alreadyRead);
      displayBook(newBook);

      document.getElementById('titleInput').value = '';
      document.getElementById('authorInput').value = '';
      document.getElementById('readInput').checked = false;
    }

    function displayBook(book) {
      const bookListElement = document.getElementById('bookList');
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = book.alreadyRead ?
              `You already read "<strong>${book.title}</strong>" by ${book.author}` :
              `You still need to read "<strong>${book.title}</strong>" by ${book.author}`;
      bookListElement.appendChild(bookElement);
    }
  });
