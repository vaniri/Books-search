import React, { Component } from 'react';
import BookContainer from '../components/BookContainer'
import axios from 'axios';

class Books extends Component {
    constuctor(props) {

        super(props);
        this.sate = { books: [] };
    }

    async componentDidMount() {
        const response = await axios.get('/books');
        const { data: books } = response;
        this.setState({ books })
    }

    render() {
        return (
            <div>
                {this.state.books.map(({ id, title, author, description, image, link }) => (
                    <BookContainer
                        key={id}
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