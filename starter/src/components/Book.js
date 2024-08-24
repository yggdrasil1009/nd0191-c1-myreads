import React from "react";

const Book = ({ book, onShelfChange }) => {
  const handleChange = (event) => {
    onShelfChange(book, event.target.value);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("bookId", book.id);
    e.dataTransfer.setData("bookShelf", book.shelf);
  };

  // Blank image if book does not have a thumbnail
  const thumbnail =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : "https://via.placeholder.com/128x193?text=No+Image";

  return (
    <div className="book" draggable onDragStart={handleDragStart}>
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${thumbnail}")`,
          }}
        />
        <div className="book-shelf-changer">
          <select value={book.shelf || "none"} onChange={handleChange}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title || "No title"}</div>
      <div className="book-authors">
        {book.authors ? book.authors.join(", ") : "No author"}
      </div>
    </div>
  );
};

export default Book;
