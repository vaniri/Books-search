import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css';

const Nav = ({ location }) => {
    return (
        <div className="nav_menu">
            <img alt="" id="nav_icon" src="https://i.pinimg.com/originals/40/fe/82/40fe82a2a1f0fb3dff4e2283c103af38.png"/>
            <Link className={`nav_item ${location.pathname === '/search' ? 'active' : ''}`} to='/search'>Search
            </Link>
            <Link className={`nav_item ${location.pathname === 'books' ? 'active' : ''}`} to='/books'><i className="fa fa-book-open"></i>All Books
            </Link>
        </div>

    )
}

export default withRouter(Nav);