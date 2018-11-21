import React, { Component } from 'react';
import { Link } from './Router';
import Counter from './Counter';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light">
          <Link to="signin" className="navbar-brand text-warning">
            <i className="fas fa-user em2" />
          </Link>
          <Link to="collection" className="navbar-brand text-warning">
            <p className="em21">ShoeFlex</p>
          </Link>
          <Link to="/" className="navbar-brand text-warning">
            <i className="fas fa-shopping-cart em2" />
          </Link>
        </nav>
        <Counter />
      </React.Fragment>
    );
  }
}

export default Navigation;
