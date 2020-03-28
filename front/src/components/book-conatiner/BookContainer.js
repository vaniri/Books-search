import React from 'react';
import './style.css';

const BookContainer = ({ title, author, description, image, link }) => {
    return (
        <div className="book_container">
            <h3 className="title">{title}</h3>
            <h5 className="author">{author}</h5>
            <p className="descript">{description}</p>
            <img alt="book" className="book_img" src={image}/>
            <a className="book_link" href={link}>Read more...</a>
        </div>

    )
}

export default BookContainer;