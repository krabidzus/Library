const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/library-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const Book = mongoose.model('Book', {
    title: {
        type: String

    },
    author: {
        type: String

    },
    pages: {
        type: Number

    }, 
    // status: {
    //     type: Number

    // },
    // id: {
    //     type: Number
    // }
})

const me = new Book({
    title: 'Pan prstenu',
    author: 'Tolkien',
    pages: 222
})

me.save().then(() => {
    console.log(me)
}).catch((error) =>{
    console.log('Error', error)
})






