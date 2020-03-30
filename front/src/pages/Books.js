import React, { Component } from 'react';
import axios from 'axios';
import BookContainer from '../components/book-conatiner/BookContainer';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    async componentDidMount() {
        await this.renderBooks();
    }

    renderBooks = async () => {
        try {
            const res = await axios.get('http://localhost:3001/books');
            this.setState({ books: res.data.books });
        } catch (err) {
            console.log("Unable to query for books:\n", err);
        }
    }

    deleteBook = async (ident) => {
        try {
            const res = await axios.delete(`http://localhost:3001/books/${ident}`);
            if (res.data.message === "OK") {
                let books = this.state.books.filter(book => book.ident !== ident);
                this.setState({ books });
            } else {
                throw res.data.reason;
            }
        } catch (err) {
            console.log("Unable to delete a book:\n", err);
        }
    }

    render() {
        return (
            <div id="books_container">
                {this.state.books.map(({ ident, image, title, author, description, link }) => (
                    <div key={ident}>
                        <BookContainer
                            key={ident + "/cont"}
                            image={image}
                            clickHandler={() => this.deleteBook(ident)}
                            text="DELETE BOOK"
                            title={title}
                            author={author}
                            description={description}
                            link={link}
                        />
                    </div>
                ))}
            </div>
        )
    }
}
export default Books;