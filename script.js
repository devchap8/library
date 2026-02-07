const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        if (this.read === true) return `${this.title} by ${this.author}, ${this.pages} pages, has been read`;
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    book.id = crypto.randomUUID();
    myLibrary.push(book);
    displayBook(book);
}

function displayBook(book) {
    const bookDisplay = document.getElementById("bookDisplay");
    const box = document.createElement("div");
    box.id = book.id;
    box.classList.add("bookContainer");
    const topLine = document.createElement("div");
    topLine.classList.add("boxLine");
    const title = document.createElement("span");  
    title.classList.add("bookTitle")
    title.innerHTML = `${book.title}`;
    const author = document.createElement("div");
    author.classList.add("bookAuthor");
    author.innerHTML = `by ${book.author}`;
    const pages = document.createElement("div");
    pages.classList.add("bookPages");
    pages.innerHTML = `${book.pages} pages`;
    const readLine = document.createElement("div");
    readLine.classList.add("boxLine");
    const readStatus = document.createElement("span");
    readStatus.classList.add("readStatus");
    (book.read === true) ? readStatus.innerHTML = `Read? Yes` 
        : readStatus.innerHTML = `Read? No`;  
    (book.read === true) ? box.classList.add("readBook") 
        : box.classList.remove("readBook"); 
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
    readLine.appendChild(readStatus);
    readLine.appendChild(readToggle);
    box.appendChild(readLine);
    bookDisplay.appendChild(box);
    updateStats();   
}

function updateStats() {
    updateBooksRead();
    updatePagesFlipped();
    updateAuthorsRead();
}

function updateBooksRead() {
    const booksReadNum = document.querySelector(".booksReadNum");
    const totalBooksNum = document.querySelector(".totalBooksNum");
    const bookWord = document.querySelector(".bookWord");
    const bookNums = getBookCounts();
    booksReadNum.innerHTML = bookNums[0];
    totalBooksNum.innerHTML = bookNums[1];
    myLibrary.length === 1 ? bookWord.innerHTML = "book" : bookWord.innerHTML = "books";
}

function getBookCounts() {
    const totalBooks = myLibrary.length;
    const readBooks = myLibrary.filter((book) => book.read === true);
    return [readBooks.length, totalBooks];
}

function updatePagesFlipped() {
    const pagesFlippedNum = document.querySelector(".pagesFlippedNum");
    const totalPagesNum = document.querySelector(".totalPagesNum");
    const pageNums = getPageCounts();
    pagesFlippedNum.innerHTML = pageNums[0];
    totalPagesNum.innerHTML = pageNums[1];
}

function getPageCounts() {
    // totalPages: use reduce to add up all the pages of the books in the library
    // totalPagesRead: use filter to filter for read books, then use the same reduce function to add the pages
    let totalPages = myLibrary.reduce((sum, book) => sum + +book.pages, 0);
    let totalPagesRead = myLibrary.filter((book) => book.read === true)
        .reduce((sum, book) => sum + +book.pages, 0);
    return [totalPagesRead, totalPages];
}

function updateAuthorsRead() {
    const authorsReadNum = document.querySelector(".authorsReadNum");
    const totalAuthorsNum = document.querySelector(".totalAuthorsNum");
    const authorWord = document.querySelector(".authorWord");
    const authorNums = getAuthorNums();
    authorsReadNum.innerHTML = authorNums[0];
    totalAuthorsNum.innerHTML = authorNums[1];
    authorNums[1] === 1 ? authorWord.innerHTML = "author" : authorWord.innerHTML = "authors";
}

function getAuthorNums() {
    //make 2 sets, authors and readAuthors
    //use .forEach to go over every book in the library and add the author to authors
    //filter myLibrary for book.read === true and add each of those authors into readAuthors
    let totalAuthorsRead = new Set();
    let totalAuthors = new Set();
    myLibrary.forEach((book) => totalAuthors.add(book.author));
    const readBooks = myLibrary.filter((book) => book.read === true);
    readBooks.forEach((book) => totalAuthorsRead.add(book.author));
    return [totalAuthorsRead.size, totalAuthors.size];
}

function addButtonEventListeners() {
    addFormToggleButtonEventListener();
    addBookDisplayEventListeners();
}

function addBookDisplayEventListeners() {
    const bookDisplay = document.querySelector("#bookDisplay");
    bookDisplay.addEventListener("click", deleteBook);
    bookDisplay.addEventListener("click", toggleRead);
}

function deleteBook(event) {
    if(event.target.classList.contains("deleteButton")) {
        const choice = confirm("Are you sure you want to remove this book from your library?");
        if(choice) {
            const display = document.getElementById("bookDisplay");
            const box = event.target.parentElement.parentElement;
            display.removeChild(box);
            const bookIndex = myLibrary.findIndex((item) => item.id === box.id);
            myLibrary.splice(bookIndex, 1);
        }
    }
    updateStats();
}

function toggleRead(event) {
    if(event.target.classList.contains("toggleRead")) {
        const box = event.target.parentElement.parentElement;
        box.classList.contains("readBook") ? box.classList.remove("readBook") : box.classList.add("readBook");
        const readStatus = box.querySelector(".readStatus");
        box.classList.contains("readBook") ? readStatus.innerHTML = "Read? Yes" : readStatus.innerHTML = "Read? No";
        // get the book in the library which matches the ID and change its read status
        let book;
        for(const libBook of myLibrary) {
            if(libBook.id === box.id) book = libBook;
        }
        box.classList.contains("readBook") ? book.read = true : book.read = false;
        updateStats();
    }
}

function addFormToggleButtonEventListener() {
    const button = document.querySelector(".formToggleButton");
    button.addEventListener("click", toggleFormDisplay)
}

function toggleFormDisplay() {
    const formContainer = document.querySelector(".formContainer");
    const header = document.querySelector(".header");
    const bookDisplay = document.querySelector("#bookDisplay");
    const footer = document.querySelector(".footer");
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
    if(header.classList.contains("blurred")) {
        header.classList.remove("blurred");
        bookDisplay.classList.remove("blurred");
        footer.classList.remove("blurred");
    }
    else {
        header.classList.add("blurred");
        bookDisplay.classList.add("blurred");
        footer.classList.add("blurred");
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

addBookToLibrary("The Outsiders", "S.E. Hinton", 192, false);
addBookToLibrary("Lord of the Flies", "William Golding", 224, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 320, true);
addButtonEventListeners();
parseBookData();