const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    title: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true

    },
    pages: {
        type: Number,
        required: true

    }, 
    status: {
        type: Date,
        required: true

    }
})

// const me = new Book({
//     title: 'dfs',
//     author: 'Kadsfdsffsdafbe',
//     pages: 4444,
//     status: '2019-01-01T00:00:02.006Z'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) =>{
//     console.log('Error', error)
// })

module.exports = Book