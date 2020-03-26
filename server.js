const express = require('express');
const bodyparser = require('body_parser');
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
            let allBooks = await db.Book.find();
            console.log(allBooks);
        } catch (err) {
            console.log("Error find books", err);
            req.json({ message: "FAIL", reason: err });

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
    .get(async (req, res) => {
        try {
            await db.Book.findByIdAndDelete({ '_id': req.params.id });
            console.log("Book delite sucse");
        } catch (err) {
            console.log("FAIL delete Book", err);
            res.json({ message: "FAIL", reason: err });
        }
    })

app.get("/*", async (req, res) => {
    res.send("index", {});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('app listening at http://localhost:3000');
});