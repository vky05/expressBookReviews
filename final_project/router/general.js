const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let user = {};



  public_users.post('/register', function (req, res) {
    const { username, password } = req.body; // Extract username and password from request body

    // Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (user[username]) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Register the new user
    user[username] = { password };
    return res.status(201).json({ message: "User registered successfully" });
  });


// router.get('/',function (req, res) {
//     res.send(JSON.stringify({books}, null, 4));
//  });
 

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
     
      const getBooks = async () => {
          return new Promise((resolve, reject) => {
              if (books) {
                  resolve(books);
              } else {
                  reject({ message: "Books data not available" });
              }
          });
      };

      const bookList = await getBooks();
      res.status(200).json(bookList);
  } catch (error) {
      res.status(500).json(error);
  }
});

// router.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn;
//     res.send(books[isbn])
//     });
// Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
      const { isbn } = req.params;
      const getBookByISBN = async () => {
          return new Promise((resolve, reject) => {
              if (books[isbn]) {
                  resolve(books[isbn]); 
              } else {
                  reject({ message: "Book not found" });
              }
          });
      };

      const bookDetails = await getBookByISBN();
      return res.status(200).json(bookDetails); 
  } catch (error) {
      return res.status(404).json(error); 
  }
});

// public_users.get('/author/:author',function (req, res) {
//   a = (JSON.stringify({books}, null, 4));
//   JSON.parse(a);
//     const author = req.params.author;
//     a = Object.values(books).filter(books=>books.author == req.params.author)
//     console.log(a);
//     res.send(a);
    
// });  
// Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  try {
      const { author } = req.params;

      // Function to fetch books by author asynchronously
      const getBooksByAuthor = async () => {
          return new Promise((resolve, reject) => {
              const booksByAuthor = Object.values(books).filter(book => book.author === author);

              if (booksByAuthor.length > 0) {
                  resolve(booksByAuthor);
              } else {
                  reject({ message: "No books found for this author" });
              }
          });
      };

      const authorBooks = await getBooksByAuthor();
      return res.status(200).json(authorBooks);
  } catch (error) {
      return res.status(404).json(error);
  }
});

// router.get('/title/:title',function (req, res) {
//   const title = req.params.title;
//   console.log("titlee",title)
//   var books_based_on_title = JSON.parse(books).filter(function (book) {
//       return book.title === req.params.title;
//   });

// });
// Get all books based on title
public_users.get('/title/:title', async (req, res) => {
  try {
      const { title } = req.params;

      // Function to fetch books by title asynchronously
      const getBooksByTitle = async () => {
          return new Promise((resolve, reject) => {
              const booksByTitle = Object.values(books).filter(book => book.title === title);

              if (booksByTitle.length > 0) {
                  resolve(booksByTitle);
              } else {
                  reject({ message: "No books found with this title" });
              }
          });
      };

      const titleBooks = await getBooksByTitle();
      return res.status(200).json(titleBooks);
  } catch (error) {
      return res.status(404).json(error);
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
