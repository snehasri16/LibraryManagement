
console.log('This is for local storage');

class Display {
    // Constructor to initialize display
    constructor() {
        this.books = [];
    }

    // Method to add book to UI
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.isbn}</td>
                            <td>${book.type}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    // Method to clear form fields
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    // Method to validate book details
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    // Method to show messages to the user
    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }

    // Method to add book to localStorage
    addBookToLocalStorage(book) {
        let books = localStorage.getItem('books');
        if (books == null) {
            this.books = [];
        } else {
            this.books = JSON.parse(books);
        }
        this.books.push(book);
        localStorage.setItem('books', JSON.stringify(this.books));
    }

    // Method to display books from localStorage
    displayBooksFromLocalStorage() {
        let books = localStorage.getItem('books');
        if (books == null) {
            this.books = [];
        } else {
            this.books = JSON.parse(books);
        }
        this.books.forEach(function (element) {
            let display = new Display();
            display.add(element);
        });
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById("isbn").value;

    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let poetry = document.getElementById("poetry");
    let databases = document.getElementById("databases");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (poetry.checked) {
        type = poetry.value;
    } else if (databases.checked) {
        type = databases.value;
    }

    let book = new Book(name, author,isbn, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');
        display.addBookToLocalStorage(book); // Save book to localStorage
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

// Instantiate Display and display books from localStorage on page load
let display = new Display();
display.displayBooksFromLocalStorage();
