import React from "react";
import Book from "./Book";

const BookShelf = ({ shelfTitle, books, allBooks, onShelfChange }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const bookId = e.dataTransfer.getData("bookId");
    const bookShelf = e.dataTransfer.getData("bookShelf");
    const draggedBook = allBooks.find((b) => b.id === bookId);

    // Convert shelf title to shelf key
    const bookShelfConvert = {
      "Currently Reading": "currentlyReading",
      "Want to Read": "wantToRead",
      "Read": "read",
    }[shelfTitle];

    // Update the shelf if it's being moved to a different shelf
    if (draggedBook && bookShelf !== bookShelfConvert) {
      onShelfChange(draggedBook, bookShelfConvert);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bookshelf" onDrop={handleDrop} onDragOver={handleDragOver}>
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onShelfChange={onShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
