import React from "react";
import { ListProps } from "../../types/Types"; //NOTE - making new folders, the two '.' that i'm using
//NOTE - are to go back to the two folders that i'm in.

//NOTE - split and updated the list component to be more easy to take apart and read rather than be in one file.

//NOTE - Array of books with title and author.

const List: React.FC<ListProps> = ({ books, onDelete, onEdit }) => {
  return (
    <div>
      {books.length === 0 ? (
        <p className="text-center">No books added yet.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-item">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button onClick={() => onEdit(book)} className="btn btn-text me-2">
              Edit
            </button>
            <button onClick={() => onDelete(book.id)} className="btn btn-text">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
