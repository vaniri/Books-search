import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css';

const Nav = ({ location }) => {
    return (
        <div className="nav_menu">
            <Link className={`nav_item ${location.pathname === '/search' ? 'active' : ''}`} to='/search'>Search
            </Link>
            <Link className={`nav_item ${location.pathname === 'books' ? 'active' : ''}`} to='/books'>All Books
            </Link>
        </div>

    )
}

export default withRouter(Nav);