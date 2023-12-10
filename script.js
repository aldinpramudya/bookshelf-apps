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

function findBookIndex(id) {
    for (const index in books) {
        if (books[index].id === id) {
            return index;
        }
    }
    return -1;
}

function undoBookFromCompleted(id) {
    const bookTarget = findBook(id);

    if (bookTarget == null)return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function removeBookFromCompleted(id) {
    const bookTarget = findBookIndex(id);

    if (bookTarget === -1)return;

    books.splice(bookTarget,1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}   

function addBookToCompleted(id) {
    const bookTarget = findBook(id);

    if (findBook == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(id) {
    for (const bookItem of books) {
        if (bookItem.id === id) {
            return bookItem;
        }
    }
    return null;
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

    if (bookObject.isComplete) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerText = 'Undo'
        undoButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        const trashButton = document.createElement('button');
        trashButton.classList.add('red');
        trashButton.innerText = 'Delete'
        trashButton.addEventListener('click', function () {
            removeBookFromCompleted(bookObject.id);
        });

        container.append(undoButton, trashButton);

    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('green');
        checkButton.innerText = 'Done';
        checkButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    const notCompletedReadBook = document.getElementById('incompleteBookshelfList');
    const completedReadBook = document.getElementById('completeBookshelfList');
    completedReadBook.innerHTML = '';
    notCompletedReadBook.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (bookItem.isComplete) {
            completedReadBook.append(bookElement);
        } else {
            notCompletedReadBook.append(bookElement);
        }
    }

});

