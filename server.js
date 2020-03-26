const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./models/books')

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/books', {
    userNewUrlParser: true
});

const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

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
        try {
            let result = await db.Book.create(req.body);
            console.log(result);
            res.json({ message: "OK", result });
        } catch (err) {
            console.log("FAIL creating Book", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.route('/books/:id')
    .delete(async (req, res) => {
        try {
            await db.Book.findByIdAndDelete({ '_id': req.params.id });
            console.log("Book deleted successfully");
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