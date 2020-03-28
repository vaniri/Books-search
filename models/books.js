const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksSchema = new Schema ({
    ident: String,
    title: String,
    authors: [String],
    publisher: String,
    description: String,
    image: String,
    link: String
})

const Book = mongoose.model('Book', BooksSchema)

module.exports = { Book };