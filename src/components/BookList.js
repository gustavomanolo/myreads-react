import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import BookShelf from './BookShelf';

export default class BookList extends Component {
	constructor(props) {
		super(props);

		// init state
		this.state = {
			books: [],
		}

		this.handleChange = this.handleChange.bind(this);
	}

	/**
		* Update parent object that maps "book id" with the shelf to set the
		* correct shelf when searching books
	 	* @param {Array} books
	*/
	updateBookShelves(books) {
		// Create object with new "books shelves" and update parent
		let booksShelves = {};
		for (let currentBook of books) {
			booksShelves[currentBook.id] = currentBook.shelf;
		}
		this.props.updateShelves(booksShelves);
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				// update "state -> books"
				this.setState({
					books
				});

				// Update books shelves
				this.updateBookShelves(books);
			})
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
				// update "state -> books"
				this.setState({
					books: newBooks,
				});

				// Update books shelves
				this.updateBookShelves(newBooks);
			})
	}

	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>

				{this.state.books.length > 0 ? (
					<div className="list-books-content">
						<div>
							<BookShelf title="Currently Reading" books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} onChange={this.handleChange} />
							<BookShelf title="Want to Read" books={this.state.books.filter((book) => book.shelf === 'wantToRead')} onChange={this.handleChange} />
							<BookShelf title="Read" books={this.state.books.filter((book) => book.shelf === 'read')} onChange={this.handleChange} />
						</div>
					</div>
				) : (
					<h2>Loading ...</h2>
				)}


				<div className="open-search">
					<a onClick={this.props.onClick}>Add a book</a>
				</div>
			</div>
		)
	}
}
