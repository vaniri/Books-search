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

    deleteBook = async id => {
        try {
            const res = await axios.delete('http://localhost:3001/books/' + id);
            if (res.data.message === "OK") { 
                let books = this.state.books.filter(book => book.ident !== id); 
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
                {this.state.books.map(({ ident, title, author, description, image, link }) => (
                    <div key={ident}>
                        <BookContainer
                            key={ident + "/cont"}
                            title={title}
                            author={author}
                            description={description}
                            image={image}
                            link={link}
                        />
                        <button className="delete_book" onClick={() => this.deleteBook(ident)}>DELETE BOOK</button>
                    </div>
                ))}
            </div>
        )
    }
}
    export default Books;