const books = [];
const RENDER_EVENT = "render-bookshelf";


document.addEventListener('DOMContentLoaded', function () {
    const inputBook = document.getElementById('inputBook');
    inputBook.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });
});

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function isButtonChecked() {
    return document.getElementById("inputBookIsComplete").checked;
}

function addBook() {
    const bookTitle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const buttonCheck = isButtonChecked();

    const generatedID = generateId();

    const bookObject = generateBookObject(generatedID, bookTitle, bookAuthor, bookYear, buttonCheck);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = bookObject.title;

    const textAuthor = document.createElement('h4');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${bookObject.id}`);

    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    const notCompletedReadBook = document.getElementById('incompleteBookshelfList');
    notCompletedReadBook.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        notCompletedReadBook.append(bookElement);
    }
});

