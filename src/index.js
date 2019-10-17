const express = require('express')
require('./db/mongoose')
const Book = require('./models/book')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
    next();
  });


app.post('/books', (req, res) =>  {

    const book = new Book(req.body) 

    book.save().then(() => {
        res.send(book)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/booksGET', (req, res) => {

    Book.find({}).then((books) => {
        res.send(books)
    }).catch((e) => {
        res.status(500).send()
    })
})

app.delete('/booksDELETE', (req, res) => {
    console.log(req.body)

    Book.findByIdAndDelete(req.body).then((book) => {
        res.send(book)
    }).catch((e) => {
        res.status(500).send()
    })
})


// Jedinej async -> predelat ostatni takhle 93. promsie chaining
// app.delete('/booksDELETE', async (req, res) => {
   
//     try {
//         const book = await Book.findByIdAndDelete(req.body)

//         if (!book) {
//             return res.status(404).send()
//         }

//         res.send(book)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})






