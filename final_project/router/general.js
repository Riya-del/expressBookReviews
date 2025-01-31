const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

  

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const reqauthor = req.params.author;
    const values = Object.values(books);
    let booksArray = values.filter((book) => book.author === reqauthor);
    res.send(booksArray);
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    const reqreqtitle = req.params.title;
    const values = Object.values(books);
    let booksArray = values.filter((book) => book.title === reqreqtitle);
    res.send(booksArray);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reqisbn = req.params.isbn;
    const book=books[reqisbn]
    const reviews = book.reviews;
    res.send(reviews);
});

module.exports.general = public_users;
