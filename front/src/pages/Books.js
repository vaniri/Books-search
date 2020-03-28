import React, { Component } from 'react';
import axios from 'axios';
import BookContainer from '../components/book-conatiner/BookContainer';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:3001/books');
        const { books } = res;
        console.log("component", res)
        this.setState({ books })
    }

    render() {
        return (
            <div id="books_container">
                {this.state.books.map(({ _id, title, author, description, image, link }) => (
                    <BookContainer
                        key={_id}
                        title={title}
                        author={author}
                        description={description}
                        image={image}
                        link={link}
                    />
                ))}
            </div>
        )
    }
}

export default Books;