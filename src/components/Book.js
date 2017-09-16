import React, { PropTypes } from 'react';

export default function Book({book, onChange, booksShelves}) {
  // Check if the current book has already a shelf
  let bookShelf = book.shelf ? book.shelf : "";
  if (typeof booksShelves !== "undefined") {
    // check if the key exists
    if (book.id in booksShelves) {
      bookShelf = booksShelves[book.id];
    }
  }

  return (
		<div className="book">
			<div className="book-top">
				<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
				<div className="book-shelf-changer">
					<select value={bookShelf} onChange={evt => onChange(book, evt.target.value)}>
						<option value="" disabled>Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors}</div>
		</div>
  );
}

Book.propTypes = {
  book: PropTypes.object,
  onChange: PropTypes.func,
};
