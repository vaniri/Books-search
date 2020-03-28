import React, { Component } from 'react';
import BookContainer from '../components/book-conatiner/BookContainer'
import Form from '../components/form/Form'
import axios from 'axios';
import { getIdentifier } from '../utils';

class Search extends Component {
    constructor(props) {

        super(props);
        this.state = { books: [] };
    }

    handleSubmit = async ({ bookTitle }) => {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}&key=""`);
        this.setState({ books: res.data.items.map(book => book.volumeInfo) });
        console.log(res.data.items[0].volumeInfo);
        try {
            if (this.state.books) {
                let res = await axios.post('http://localhost:3001/books', this.state.books);
                if (res.data.message === "OK") {
                    console.log("Book posted successfully");
                } else {
                    throw res.data.reason;
                }
            }
        } catch (err) {
            console.log("Unable to post: ", err);
        }
    }


async componentDidMount() {
    try {
        const res = await axios.get('/books');
        const { data: books } = res;
        this.setState({ books });
    } catch (err) {
        console.log("Unable to query for books:\n", err);
    }

}

render() {
    return (
        <div id="form_container">
            <Form handleSubmit={this.handleSubmit} />
            <div>
                {this.state.books.map(({ industryIdentifiers, title, authors, description, imageLinks, infoLink, publisher }) => (
                    <BookContainer
                        key={getIdentifier(industryIdentifiers)}
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