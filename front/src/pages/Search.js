import React, { Component } from 'react';
import BookContainer from '../components/BookContainer'
import Form from '../components/Form'
import axios from 'axios';

class Search extends Component {
    constructor(props) {

        super(props);
        this.state = { books: [] };
    }

    handleSubmit = async booktitle => {
        const res = await axios.get('goole');
        console.log(res);
        this.setState({ books: res }); //TODO
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