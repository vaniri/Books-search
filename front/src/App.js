import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-route-dom';

import './App.css';
import Nav from './components/Nav';
import BookContainer from '/components/BookContainer';
import Form from './components/Form';
import Search from './pages/Search';
import Books from './pages/Books'

function App() {
    return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/books">
                        <Books />
                    </Route>
                </Switch>
                <Form />
                <BookContainer />
            </div>
        </Router>
    )
}

export default App;