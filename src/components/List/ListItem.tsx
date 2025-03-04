import React, { useState } from "react";
import { Book } from "../../types/Types";
import ListActions from "./ListActions";

interface ListItemProps {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedBook: Book) => void;
}

// Displays a single book entry and handles edit mode.
const ListItem: React.FC<ListItemProps> = ({ book, onDelete, onEdit }) => {
  const [editId, setEditId] = useState<number | null>(-1);
  const [editInput, setEditInput] = useState({
    title: book.title,
    author: book.author,
  });

  const handleSaveEdit = () => {
    if (editInput.title && editInput.author) {
      onEdit(book.id, { id: book.id, ...editInput });
      setEditId(null);
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
          <ListActions
            onSave={handleSaveEdit}
            onDelete={() => onDelete(book.id)}
          />
        </div>
      ) : (
        <span className="book-text" onClick={() => setEditId(book.id)}>
          {book.title} - {book.author}
        </span>
      )}
    </div>
  );
};

export default ListItem;
