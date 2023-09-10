import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Books from "./components/Books";
import AddBook from "./components/AddBook";
import SearchBar from "./components/SearchBar";
import { fetchBooks, deleteBook } from "./features/api/apiService";

function App() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [books, setBooks] = useState([]);


  useEffect(() => {
    fetchBooks()
      .then((bookData) => {
        setBooks(bookData);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAddBook = (newBook) => {
    setBooks([newBook, ...books]);
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await deleteBook(bookId);
      if (response.status === 200) {
        setBooks(books.filter((book) => book.id !== bookId));
      } else {
        console.error("Failed to delete book:", response.data);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSearch = (searchTerm, searchFilter) => {
    fetchBooks(searchTerm, searchFilter)
      .then((bookData) => {
        setBooks(bookData);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddBook(!showAddBook)}
        showAdd={showAddBook}
      />
      {showAddBook && <AddBook onAddBook={handleAddBook} />}
      <SearchBar onSearch={handleSearch} />
      {books.length > 0 ? (
        <Books books={books} onDelete={handleDelete} />
      ) : (
        "No Books availabe in Library"
      )}
    </div>
  );
}

export default App;
