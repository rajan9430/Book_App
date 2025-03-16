const CATEGORY_API = "https://books-backend.p.goit.global/books/category-list";

const TOPBOOKS_API = "https://books-backend.p.goit.global/books/top-books";

const categoryContainer = document.querySelector(".category-container");
const allCategories = document.querySelector("#all-categories");
const booksContainer = document.querySelector(".books-container");
let books = [];

//! calling function to fetch and show categories
getCategories(CATEGORY_API);

getAllBooks(TOPBOOKS_API);

// * GET DATA FUNCTION
async function getData(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

// * GET CATEGORIES FUNCTION
async function getCategories(url = CATEGORY_API) {
  const data = await getData(url);
  // console.log(data);
  // display categories from fetched data
  displayCategories(data);
}

// * DISPLAY CATEGORY FUNCTION
function displayCategories(arr) {
  const fragment = document.createDocumentFragment();

  arr.forEach((obj) => {
    const category = document.createElement("p");
    category.innerText = obj.list_name;

    // add event on each category, when click matching books shal be visible
    category.addEventListener("click", (e) => {
      // finding the matching object with mathcing category
      booksContainer.innerHTML = ""; // make container blank only when a category is clicked
      let categoryBooksObject = books.find((obj) => {
        return e.target.innerText === obj.list_name;
      });
      // console.log(categoryBooksObject);
      displayBooks(categoryBooksObject.books);
    });

    fragment.append(category);
  });
  categoryContainer.append(fragment);
}

// add event on all categories manually
allCategories.addEventListener("click", ()=> {
  booksContainer.innerHTML = ""; // make container blank only when all category is clicked
  getAllBooks(TOPBOOKS_API)
});

// * GET ALL BOOKS FUNCTION
async function getAllBooks(url) {
  const data = await getData(url);
  books = data;
  console.log("books", data);

  booksContainer.append("BEST SELLER BOOKS");
  data.forEach((obj) => {
    let fewBooks = obj.books.slice(0, 3); // first 3 books of each segment
    displayBooks(fewBooks);
  });
}

// * DISPLAY BOOKS FUNCTION
function displayBooks(arr) {
  const parentDiv = document.createElement("div"); // outermost div for each segment
  parentDiv.classList.add("parent-div");
  const fragment = document.createDocumentFragment();

  // heading same he to kahi se bhi laga dia
  const heading = document.createElement("h2");
  heading.innerText = arr[0].list_name;
  parentDiv.append(heading);

  const innerBooksDiv = document.createElement("div"); // container to wrap books div
  innerBooksDiv.classList.add("inner-books-div");
  // har obj se book banake append kia
  arr.forEach((obj) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");

    const image = document.createElement("img");
    image.src = obj.book_image;

    const title = document.createElement("p");
    title.innerText = obj.title;

    const author = document.createElement("p");
    author.innerText = obj.author;

    bookDiv.append(image, title, author);
    innerBooksDiv.append(bookDiv);
    // fragment.append(bookDiv);
  });
  parentDiv.append(innerBooksDiv);

  const showMoreButton = document.createElement("button");
  showMoreButton.innerText = "Show More";
  showMoreButton.classList.add("show-more");


  parentDiv.append(showMoreButton);
  booksContainer.append(parentDiv);
}

