const mangoose = require('mangoose');
const { Shema } = mangoose;

const BooksShema = new Shema ({
    title: String,
    author: String,
    description: String,
    image: String,
    link: String
})

const Book = mangoose.model('Book', BooksShema)

module.exports = Book;