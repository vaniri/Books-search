import React, { Component } from 'react';
import BookContainer from '../components/book-conatiner/BookContainer'
import Form from '../components/form/Form'
import axios from 'axios';
import utils from '../utils';

class Search extends Component {
    constructor(props) {

        super(props);
        this.state = { books: [] };
    }

    handleSubmit = async ({ bookTitle }) => {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&key=`);
        this.setState({ books: res.data.items.map(book => book.volumeInfo) });
    }

    saveBook = async (book) => {
        try {
            let res = await axios.post('http://localhost:3001/books', book);
            if (res.data.message === "OK") {
                console.log("Book posted successfully");
            } else {
                throw res.data.reason;
            }
        } catch (err) {
            console.log("Unable to post:", err);
        }
    }

    render() {
        return (
            <div id="form_container">
                <div>
                    <Form handleSubmit={this.handleSubmit} />
                    {this.state.books.map(book => {
                        let { industryIdentifiers, title, authors, description, imageLinks, infoLink, publisher } = book;
                        let ident = utils.getIdentifier(industryIdentifiers);
                        return (
                            <div key={ident}>
                                <BookContainer
                                    key={ident}
                                    title={title}
                                    author={authors ? authors.join(", ") : publisher}
                                    description={description}
                                    image={imageLinks.thumbnail}
                                    link={infoLink}
                                />
                                <button className="save_book" onClick={() => this.saveBook(book)}>SAVE BOOK</button>
                            </div>
                        )
                    })}
                </div>
            </div>

        )
    }
}

export default Search;