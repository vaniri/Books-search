import React, { Component } from 'react';
import BookContainer from '../components/BookContainer'
import axios from 'axios';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:3001/books');
        const { books } = response;
        this.setState({ books })
    }

    render() {
        return (
            <div>
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