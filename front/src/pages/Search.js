import React, { Component } from 'react';
import BookContainer from '../components/BookContainer'
import Form from '../components/Form'
import axios from 'axios';

class Search extends Component {
    constuctor(props) {

        super(props);
        this.sate = { books: [] };
    }

    handleSubmit = books => {
        this.setState({books: [...this.state.books, books]});
    }

    async componentDidMount() {
        const response = await axios.get('/books');
        const { data: books } = response;
        this.setState({ books })
    }

    render() {
        return (
            <div>
                <Form handleSubmit={this.handleSubmit} />
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

export default Search;