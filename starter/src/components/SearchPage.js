import React from "react";
import Book from "./Book";
import { useState, useEffect } from "react";
import { search } from "../BooksAPI";
import { Link } from "react-router-dom";

const SearchPage = ({ booksInShelves, onShelfChange }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResult] = useState([]);

  // Execute search
  useEffect(() => {
    if (query) {
      // Call api search
      search(query).then((results) => {
        if (results && !results.error) {
          // Merge books on shelves with search results
          const resultsWithShelf = results.map((result) => {
            const bookOnShelf = booksInShelves.find((b) => b.id === result.id);
            return bookOnShelf
              ? { ...result, shelf: bookOnShelf.shelf }
              : result;
          });
          setSearchResult(resultsWithShelf);
        } else {
          setSearchResult([]);
        }
      });
    } else {
      setSearchResult([]);
    }
  }, [query, booksInShelves]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
