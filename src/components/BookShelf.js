import React, { PropTypes } from 'react';
import Book from './Book';

export default function BookShelf({title, books, onChange, booksShelves}) {
  return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.map((currentBook) => {
						return (<li key={currentBook.id}>
							<Book book={currentBook} onChange={onChange} booksShelves={booksShelves} />
						</li>)
					})}
				</ol>
			</div>
		</div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  onChange: PropTypes.func,
};
