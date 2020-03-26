const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema ({
    title: String,
    author: String,
    description: String,
    image: String,
    link: String
})

const Book = mongoose.model('Book', BooksSchema)

module.exports = Book;