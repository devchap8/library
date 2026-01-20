const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        if (this.read === true) return `${this.title} by ${this.author}, ${this.pages} pages, has been read`;
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    clearLibrary();
    const bookDisplay = document.getElementById("bookDisplay");
    for (book of myLibrary) {
        const box = document.createElement("div");
        box.id = book.id;
        box.classList.add("bookContainer");
        const topLine = document.createElement("div");
        topLine.classList.add("boxLine");
        const title = document.createElement("span");  
        title.innerHTML = `Title: ${book.title}`;
        const author = document.createElement("div");
        author.innerHTML = `Author: ${book.author}`;
        const pages = document.createElement("div");
        pages.innerHTML = `Pages: ${book.pages}`;
        const read = document.createElement("div");
        read.classList.add("boxLine");
        (book.read === true) ? read.innerHTML = `Read? Yes` 
            : read.innerHTML = `Read? No`;  
        const readToggle = document.createElement("button");
        readToggle.classList.add("toggleRead");
        readToggle.innerHTML = "Toggle Read";
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.classList.add("deleteButton");
        topLine.appendChild(title);
        topLine.appendChild(deleteButton);
        box.appendChild(topLine)
        box.appendChild(author);
        box.appendChild(pages);
        read.appendChild(readToggle);
        box.appendChild(read);
        bookDisplay.appendChild(box);
        addButtonEventListeners();
    }    
}

function clearLibrary() {
    const display = document.getElementById("bookDisplay");
    let books = document.querySelectorAll(".bookContainer");
    books = Array.from(books);
    for(book of books) {
        display.removeChild(book);
    }
}

function addButtonEventListeners() {
    addDeleteButtonEventListeners();
    addReadToggleEventListeners();
    addFormToggleButtonEventListener();
}

function addDeleteButtonEventListeners() {
    let buttons = document.querySelectorAll(".deleteButton");
    buttons = Array.from(buttons);
    for(deleteButton of buttons) {
        deleteButton.addEventListener("click", deleteBook)
    }
}

function deleteBook() {
    const display = document.getElementById("bookDisplay");
    const box = this.parentElement.parentElement;
    display.removeChild(box);
    const bookIndex = myLibrary.findIndex((item) => item.id === box.id);
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function addReadToggleEventListeners() {
    let buttons = document.querySelectorAll(".toggleRead");
    buttons = Array.from(buttons);
    for(toggleButton of buttons) {
        toggleButton.addEventListener("click", toggleRead);
    }
}

function toggleRead() {
    const box = this.parentElement.parentElement;
    for(book of myLibrary) {
        if (book.id === box.id) {
            const thisBook = book;
            thisBook.read = !thisBook.read;
            displayBooks();
        }
    }

}

function addFormToggleButtonEventListener() {
    const button = document.querySelector(".formToggleButton");
    button.addEventListener("click", toggleFormDisplay)
}

function toggleFormDisplay() {
    const formContainer = document.querySelector(".formContainer");
    if(formContainer.classList.contains("hideFormContainer")) {
        formContainer.classList.remove("hideFormContainer");
        const titleInput = document.querySelector("#title");
        titleInput.value = "";
        const authorInput = document.querySelector("#author");
        authorInput.value = "";
        const pagesInput = document.querySelector("#pages");
        pagesInput.value = "";
        const readInput = document.querySelector("#read");
        readInput.checked = false;
    }
    else {
        formContainer.classList.add("hideFormContainer");
    }
}

function parseBookData() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let bookData = new FormData(form);
        const title = bookData.get("title");
        const author = bookData.get("author");
        const pages = bookData.get("pages");
        const read = (bookData.get("read") === "on" ?
            true : false);
        addBookToLibrary(title, author, pages, read);
        toggleFormDisplay();
    })
}

addBookToLibrary("Hobbit", "Tolkein", 300, false);
addBookToLibrary("Lord of the Rings", "Tolkein", 600, true);
parseBookData();
