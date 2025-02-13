import React, { useState } from "react";
import { ListProps } from "./Types";

//NOTE - Array of books with title and author.

const List: React.FC<ListProps> = ({ books, onDelete, onEdit }) => {
  //NOTE -  Changed second `null` to `-1` to prevent issues with `useState` not being recognized
  // This fixes the app not showing up and ensures a proper default state
  const [editId, setEditId] = useState<number | null>(-1);
  const [editInput, setEditInput] = useState<{ title: string; author: string }>(
    {
      title: "",
      author: "",
    }
  );

  //NOTE - adding on editing to fix any issues with mispelling or errors in the list.
  const handleSaveEdit = (id: number) => {
    if (editInput.title && editInput.author) {
      onEdit(id, { id, ...editInput });
      setEditId(null);
      setEditInput({ title: "", author: "" });
    }
  };

  console.log("books added:", books);

  //NOTE -  cleared out old code for the new updated code and
  // updated to use boostrap and flexbox for a cleaner look
  //NOTE - redid a lot of the code to make it cleaner and more efficiant
  // fixing the editing to make it look nicer.

  return (
    <div className="frosted-container">
      {books.map((book) => (
        <div
          key={book.id}
          className={`book-entry ${editId === book.id ? "editing" : ""}`}
          onClick={() => {
            if (editId !== book.id) {
              setEditId(book.id);
              setEditInput({ title: book.title, author: book.author });
            }
          }}
        >
          {editId === book.id ? (
            <div className="edit-mode">
              <input
                type="text"
                className="editable-input"
                value={editInput.title}
                onChange={(e) =>
                  setEditInput({ ...editInput, title: e.target.value })
                }
              />
              <span> - </span>
              <input
                type="text"
                className="editable-input"
                value={editInput.author}
                onChange={(e) =>
                  setEditInput({ ...editInput, author: e.target.value })
                }
              />
              <button
                className="btn-save"
                onClick={() => handleSaveEdit(book.id)}
              >
                Save
              </button>
              <button
                className="btn-delete-transparent"
                onClick={() => onDelete(book.id)}
              >
                X
              </button>
            </div>
          ) : (
            <span className="book-text">
              {book.title} - {book.author}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
