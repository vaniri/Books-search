import React from 'react';
import './style.css';

const BookContainer = ({ title, image, clickHandler, text, author, description, link }) => {
    return (
        <div className="book_container">
            <div className="img-btn-container">
            <img alt="book" className="book_img" src={image}/>
            <br />
            <button className="button" onClick={clickHandler}>{text}</button>
            </div>
            <div className="book_info">
            <h3 className="title">{title}</h3>
            <h5 className="author">{author}</h5>
            <p className="descript">{description}</p>
            <a className="book_link" href={link}>Read more...</a>
            </div>
        </div>

    )
}

export default BookContainer;