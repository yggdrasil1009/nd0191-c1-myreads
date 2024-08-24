import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import BookShelf from "./components/BookShelf";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";

const App = () => {
  const [books, setBooks] = useState([]);

  // Get list books
  useEffect(() => {
    // Call api get all books
    BooksAPI.getAll().then((results) => {
      setBooks(results);
    });
  }, []);

  // Handle shelf change
  const onShelfChange = (book, shelf) => {
    // Call api update book's shelf on the server
    BooksAPI.update(book, shelf).then(() => {
      // Update local state
      setBooks((currentBooks) => {
        const updatedBooks = currentBooks.filter((b) => b.id !== book.id);

        if (shelf !== "none") {
          updatedBooks.push({ ...book, shelf: shelf });
        }
        return updatedBooks;
      });
    });
  };

  return (
    <div className="app">
      <Routes>
        <Route
          path="/search"
          element={
            <SearchPage booksInShelves={books} onShelfChange={onShelfChange} />
          }
        />
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    shelfTitle="Currently Reading"
                    books={books.filter(
                      (book) => book.shelf === "currentlyReading"
                    )}
                    allBooks={books}
                    onShelfChange={onShelfChange}
                  />
                  <BookShelf
                    shelfTitle="Want to Read"
                    books={books.filter((book) => book.shelf === "wantToRead")}
                    allBooks={books}
                    onShelfChange={onShelfChange}
                  />
                  <BookShelf
                    shelfTitle="Read"
                    books={books.filter((book) => book.shelf === "read")}
                    allBooks={books}
                    onShelfChange={onShelfChange}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Search books</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
