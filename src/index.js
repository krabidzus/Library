const express = require('express')
require('./db/mongoose')
const Book = require('./models/book')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.post('/books', (req, res) =>  {
    
   // res.set("Access-Control-Allow-Origin","*")

    console.log('cmd post index.js')
    console.log(req.body)

    const book = new Book(req.body)  // params

    book.save().then(() => {
        res.send(book)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/booksGET', (req, res) => {
    
    // res.header("Access-Control-Allow-Origin","*")

    console.log('cmd get index.js')

    Book.find({}).then((books) => {
        res.send(books)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})






