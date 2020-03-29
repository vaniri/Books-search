const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models/books');
const utils = require('./front/src/utils');

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/books', {
    userNewUrlParser: true
});

const app = express();
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, DELETE");
    next();
});

app.route('/books')
    .get(async (req, res) => {
        try {
            let books = await db.Book.find();
            console.log(books);
            res.json({ books });
        } catch (err) {
            console.log("Error find books", err);
            res.json({ message: "FAIL", reason: err });

        }
    })
    .post(async (req, res) => {
        let bookObjs = {
            ident: utils.getIdentifier(req.body.industryIdentifiers),
            title: req.body.title,
            authors: req.body.authors,
            publisher: req.body.publisher,
            description: req.body.description,
            image: req.body.imageLinks.thumbnail,
            link: req.body.infoLink
        };

        try {
            let inserted = await db.Book.create(bookObjs);
            res.json({ message: "OK" });
        } catch (err) {
            console.log("FAIL creating Book", err);
            res.json({ message: "FAIL", reason: err.toString() });
        }
    })

app.route('/books/:id')
    .delete(async (req, res) => {
        try {
            await db.Book.findOneAndDelete({ 'ident': req.params.id });
            console.log("Book deleted successfully");
            res.json({ message: "OK" });
        } catch (err) {
            console.log("FAIL delete Book", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.get("*", async (req, res) => {
    res.sendFile(path.join(__dirname, "./front/build/index.html"));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});