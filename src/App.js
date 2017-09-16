import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchPage from './components/searchPage';
import BookList from './components/BookList';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.updateShelves = this.updateShelves.bind(this);
  }
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksShelves: {}, // used to set the correct shelf when searching
  }

  updateShelves(booksShelves) {
    this.setState({
      booksShelves,
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchPage onClick={() => this.setState({ showSearchPage: false })} booksShelves={this.state.booksShelves} />
        ) : (
          <BookList onClick={() => this.setState({ showSearchPage: true })} updateShelves={this.updateShelves} />
        )}
      </div>
    )
  }
}

export default BooksApp
