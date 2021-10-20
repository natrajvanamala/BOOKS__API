const express = require("express");
const { request } = require("https");

// DATABASE
const database = require("./database");

// Initialise express
const booky = express();

/*
route
description     get all vooks
access          public
paraeter        none
methods         get
*/


booky.get("/", (req,res) =>{
    return res.json({books: database.books});
});


/*
route           /is
description     get all vooks
access          public
paraeter        ISBN
methods         get
*/

booky.get("/is/:isbn", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0){
        return res.json({error: `No Book found for thr ISBN of ${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook})
});

/*
route           /c
description     get specific book on category 
access          public
paraeter        category 
methods         GET
*/

booky.get("/c/:category", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.include(req.params.category)
    )

    if(getSpecificBook.length === 0) {
        return res.json ({ error: `No book found for the category of ${ req.params.category}`})
    }

    return res.json ({book:getSpecificBook});  
});

/*
route           /l
description     get specific book based on language  
access          public
paraeter        category 
methods         GET
*/

// API ON LANGUAGE PENDING 
booky.get("/l/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.include(req.params.language)
    )

    if(getSpecificBook.length === 0) {
        return res.json ({ error: `No book found for the category of ${ req.params.language}`})
    }

    return res.json ({book:getSpecificBook});  
});

/*
route           /author
description     get all the authors   
access          public
paraeter        category 
methods         GET
*/

booky.get("/author", (req,res) => {
    return res.json({authors: database.author });
});

/*
route           /author/book
description     get all the authors based on books
access          public
paraeter        isbn 
methods         GET
*/

booky.get("/author/book/:isbn", (req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        });
    }
    return res.json({author: getSpecificAuthor});
});

/*
route           /publications/book
description     get all publications
access          public
paraeter        none 
methods         GET
*/

booky.get("/publications",(req,res) =>{
    return res.json({publications: database.publication});
});

booky.listen(3000,()=>{
    console.log("server is up and running");
});