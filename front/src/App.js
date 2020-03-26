import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import './App.css';
import Nav from './components/Nav';
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
            </div>
        </Router>
    )
}

export default App;