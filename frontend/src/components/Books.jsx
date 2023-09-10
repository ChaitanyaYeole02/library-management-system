import React from "react";

const Books = ({ books, onDelete }) => {
  return (
    <div className="books-container">
      {books.map((book) => (
        <div key={book.id} className="book">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Published On: {book.publication_date}</p>
            <p>Available On: {book.availability_date}</p>
            <p>Borrowed On: {book.borrowed_date}</p>
          </div>
          <div className="book-actions">
            <button className="delete-button" onClick={() => onDelete(book.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
