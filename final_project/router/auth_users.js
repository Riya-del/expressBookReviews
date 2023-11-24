const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
   if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 * 60 });
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("Customer successfully logged in");
    } else {
        return res.status(200).send("Customer successfully logged in");
 }
});



// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const reqisbn = req.params.isbn;
  let filtered_books = books.filter((book) => book.isbn === reqisbn);
 
  if (filtered_books.length > 0) {
    let filtered_book = filtered_books[0];
    let review = req.query.review;
    if(review) {
        filtered_book.review = review
    }
   
    books.push(filtered_book);
    res.send(`The review for the book with ISBN ${isbn} has been added or updated`);
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) =>  {
    const isbn = req.params.isbn;
    if (isbn){
        delete books[isbn]
    }
    res.send(`Book with the isbn  ${isbn} deleted.`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users; 
