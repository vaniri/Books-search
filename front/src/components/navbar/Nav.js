import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css';

const Nav = ({ location }) => {
    return (
        <div className="nav_menu">
            <img id="nav_icon" src="https://www.pinclipart.com/picdir/big/330-3302324_buy-now-books-icon-vector-white-clipart.png"/>
            <Link className={`nav_item ${location.pathname === '/search' ? 'active' : ''}`} to='/search'>Search
            </Link>
            <Link className={`nav_item ${location.pathname === 'books' ? 'active' : ''}`} to='/books'><i className="fa fa-book-open"></i>All Books
            </Link>
        </div>

    )
}

export default withRouter(Nav);