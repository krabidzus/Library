// request s url

const request = require('request')

const addBook = (callback) => {
    const url = 'localhost:3000'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = addBook