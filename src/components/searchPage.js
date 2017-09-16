import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';

class SearchPage extends Component {
  constructor(props) {
		super(props);

		// init state
		this.state = {
      search: '',
      books: [],
		}

		this.handleChange = this.handleChange.bind(this);
	}
  // state = {
  //   search: '',
  //   books: [],
  // };

  /**
		* Search books by name
	 	* @param {String} search
	*/
  handleSearch (search) {
    this.setState({
      search: search.trimLeft(),
    });
    BooksAPI.search(search.trimLeft(), 20)
      .then(resultSearch => {
        // check for errors from API
        if (typeof resultSearch === 'object' && !resultSearch.error) {
          this.setState({
            books: resultSearch,
          });
        } else {
          // clear book state if error found
          this.setState({
            books: [],
          });
        }

      });
  }

  /**
		* Update a book shelf
	 	* @param {Object} book
	 	* @param {String} shelf
	*/
	handleChange(book, shelf) {
		BooksAPI.update(book, shelf)
			.then(result => {
				// update state
				let newBooks = this.state.books.map((currentBook) => {
					if (currentBook.id === book.id) {
						currentBook.shelf = shelf;
					}
					return currentBook;
				});
				this.setState({
					books: newBooks,
				})
			})
	}

  render() {
    // console.log('books shelves', this.props.booksShelves);
    return (
			<div className="search-books">
				<div className="search-books-bar">
					<a className="close-search" onClick={this.props.onClick}>Close</a>
					<div className="search-books-input-wrapper">
						{/*
							NOTES: The search from BooksAPI is limited to a particular set of search terms.
							You can find these search terms here:
							https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

							However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
							you don't find a specific author or title. Every search is limited by search terms.
						*/}
						<input type="text" placeholder="Search by title or author" value={this.state.search} onChange={evt => this.handleSearch(evt.target.value)} />

					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
            { this.state.search.length > 0 ? (
              <BookShelf title="Search results" books={this.state.books} onChange={this.handleChange} booksShelves={this.props.booksShelves} />
            ) : (
              <h2>Enter a search term</h2>
            )}
          </ol>
				</div>
			</div>
		);
  }
}

export default SearchPage;
