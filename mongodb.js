// CRUD create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'LibraryDB'

MongoClient.connect(connectionURL, { useUnifiedTopology: true, useNewUrlParser: true }, (error, book) => {   // tady mozna predelat
    if(error) {
        return console.log('Unable to connect to database')
    }
    
    const db = book.db(databaseName)

    db.collection('books').insertOne({
        title: 'PP',
        author: 'Tolkien'
    })
})










