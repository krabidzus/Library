const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/LibraryDB', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const databaseName = 'LibraryDB'

// const me = new Book({
//     title: 'tcp ip',
//     author: 'Kabe',
//     pages: 444,
//     status: '2019-01-01T00:00:02.006Z'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) =>{
//     console.log('Error', error)
// })






