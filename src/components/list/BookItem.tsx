
import React, { useState, useContext  } from "react";
import { Book } from "../../types/Types";
import { BookItemProps } from "../../types/Types";
import { BookContext, API_URL, useBookContext } from "../shared/BookContext";


//NOTE -  Displays a single book entry and handles edit mode.
const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onSaveEdit }) => {
  const [editId, setEditId] = useState<string | null>(null);
  const bookContext = useContext(BookContext);
  const { setAllBooks } = useBookContext();

  if (!bookContext) {
    throw new Error("BookContext is not provided.");
  }

  const { selectedBookIds } = bookContext;
  console.log({ selectedBookIds });
  const [editInput, setEditInput] = useState({
    title: book.title,
    author: book.author,
  });

  const handleSaveEdit = () => {
    const updatedBook: Book = {
      ...book,
      title: editInput.title,
      author: editInput.author,
    };
    onSaveEdit(updatedBook); 
    setEditId(null);
  };

  const handleCheckboxToggle = async (book: Book) => {
    const updatedBook = { ...book, checked: !book.checked };
    
    try {
      const response = await fetch(`${API_URL}/${book.id}`, {
        method: "PUT",  //REVIEW -  Using PUT to update the whole book
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checked: updatedBook.checked,
          deleted: updatedBook.deleted  // Include deleted property if needed
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update checkbox state");
      }
  
      setAllBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === book.id ? updatedBook : b))
      );
    } catch (error) {
      console.error("Error toggling checkbox:", error);
    }
  };

  return (
    <div className={`book-entry ${editId === book.id ? "editing" : ""}`}>
      {editId === book.id ? (
        <div className="edit-mode">
          <input
            type="text"
            className="editable-input"
            value={editInput.title}
            onChange={(e) =>
              setEditInput({ ...editInput, title: e.target.value })
            }
            id={`title-${book.id}`} 
            name="title" 
          />
  
          <span> - </span>
  
          <input
            type="text"
            className="editable-input"
            value={editInput.author}
            onChange={(e) =>
              setEditInput({ ...editInput, author: e.target.value })
            }
            id={`author-${book.id}`} 
            name="author" 
          /> 
  
          <button onClick={handleSaveEdit} className="btn btn-primary">
            Save
          </button>
          <button onClick={() => onDelete(book.id)} className="btn btn-danger">
            Delete
          </button>
          <button onClick={() => setEditId(null)} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      ) : (
        <>
          {/* Updated checkbox input with unique ID */}
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={book.checked}
            onChange={() => handleCheckboxToggle(book)}
            id={`checkbox-${book.id}`}
            name={`checkbox-${book.id}`} 
            value={book.id} 
            title="Check to send to review page" 
          /> {/* Corrected self-closing tag for the checkbox */}
  
          <label htmlFor={`checkbox-${book.id}`} className="form-check-label">
            {book.title} - {book.author}
          </label>
        </>
      )}
    </div>
  );
};
  
  export default BookItem;
