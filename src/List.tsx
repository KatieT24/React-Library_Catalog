import React from "react";

interface Book {
  title: string;
  author: string;
}

interface ListProps {
  books: Book[];
  onDelete: (index: number) => void;
}

//NOTE - Array of books with title and author.

const List: React.FC<ListProps> = ({ books, onDelete }) => {
  console.log("books added:", books);
  return (
    <ul>
      {books.map((book, index) => (
        //NOTE - this key is used to work with the map function
        // to show the list of books added.
        <li key={index}>
          {book.title} by {book.author}{" "}
          <button onClick={() => onDelete(index)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default List;
