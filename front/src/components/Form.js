import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            bookTitle: ""
        }

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { bookTitle } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <input
                    type='text'
                    name='book'
                    id='book'
                    value={bookTitle}
                    onChange={this.handleChange}
                    placeholder='Book Title'>
                </input>
                <button type='submit'>
                    Search
                </button>
            </form>
        )
    }
}

export default Form;