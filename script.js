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
}

function displayBooks() {
    const table = document.getElementById("library-table");
    for (book of myLibrary) {
        const row = document.createElement("tr");
        row.id = book.id;
        const title = document.createElement("td");  
        title.innerHTML = book.title;
        const author = document.createElement("td");
        author.innerHTML = book.author;
        const pages = document.createElement("td");
        pages.innerHTML = book.pages;
        const read = document.createElement("td");
        (book.read === true) ? read.innerHTML = "Yes" : read.innerHTML = "No";  
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "DELETE";
        deleteButton.classList.add("deleteButton");
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(deleteButton);
        table.appendChild(row);
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
    const table = document.getElementById("library-table");
    const row = this.parentElement;
    table.removeChild(row);
    const bookIndex = myLibrary.findIndex((item) => item.id === row.id);
    myLibrary.splice(bookIndex, 1);
    displayBooks();

}

addBookToLibrary("Hobbit", "Tolkein", 300, false);
displayBooks();