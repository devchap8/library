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
    const bookDisplay = document.getElementById("bookDisplay");
    for (book of myLibrary) {
        const box = document.createElement("div");
        box.id = book.id;
        box.classList.add("bookContainer");
        const title = document.createElement("div");  
        title.innerHTML = `Title: ${book.title}`;
        const author = document.createElement("div");
        author.innerHTML = `Author: ${book.author}`;
        const pages = document.createElement("div");
        pages.innerHTML = `Pages: ${book.pages}`;
        const read = document.createElement("div");
        (book.read === true) ? read.innerHTML = `Read? Yes` 
            : read.innerHTML = `Read? No`;  
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "DELETE";
        deleteButton.classList.add("deleteButton");
        box.appendChild(title);
        box.appendChild(author);
        box.appendChild(pages);
        box.appendChild(read);
        box.appendChild(deleteButton);
        bookDisplay.appendChild(box);
        addButtonEventListeners();
    }    
}

function addButtonEventListeners() {
    let buttons = document.querySelectorAll(".deleteButton");
    buttons = Array.from(buttons);
    for(deleteButton of buttons) {
        deleteButton.addEventListener("click", deleteBook)
    }
}

function deleteBook() {
    const display = document.getElementById("bookDisplay");
    const box = this.parentElement;
    bookDisplay.removeChild(box);
    const bookIndex = myLibrary.findIndex((item) => item.id === row.id);
    myLibrary.splice(bookIndex, 1);
    displayBooks();

}

addBookToLibrary("Hobbit", "Tolkein", 300, false);