import React, { Component } from 'react';
import BookContainer from '../components/book-conatiner/BookContainer'
import Form from '../components/form/Form'
import axios from 'axios';

class Search extends Component {
    constructor(props) {

        super(props);
        this.state = { books: [] };
    }

    handleSubmit = async ({ bookTitle }) => {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&key=""`);
        this.setState({ books: res.data.items.map(book => book.volumeInfo) }); 
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/books');
            const { data: books } = res;
            this.setState({ books })
        } catch (err) {
            console.log("Unable to query for books:\n", err);
        }
    }

    render() {
        return (
            <div id="form_container">
                <Form handleSubmit={this.handleSubmit} />
                <div id="books_container">
                    {this.state.books.map(({ id, title, authors, description, imageLinks, infoLink, publisher }) => (
                        <BookContainer
                            key={id}
                            title={title}
                            author={authors ? authors.join(", ") : publisher}
                            description={description}
                            image={imageLinks.thumbnail}
                            link={infoLink}
                        />
                    ))}
                </div>
            </div>

        )
    }
}

export default Search;