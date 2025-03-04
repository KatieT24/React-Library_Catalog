//REVIEW - redid everything  to make it much more cleaner and more efficiant.
// all old comments have been removed and new comment added to explain the process

import React, { useState, useEffect } from "react";
import { AddBookFormProps, Book } from "../../types/Types";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { Form as BootstrapForm } from "react-bootstrap";

//REVIEW - Fixing my componets folder and breaking things down into smaller files for
// organizing and making it easier to read without so  much clutter.

//NOTE - renewed old code for logic (creating and updating especially updating props on types.tsx)
const Form: React.FC<AddBookFormProps> = ({
  onAdd,
  selectedBook,
  books,
  clearSelectedBook,
}) => {
  console.log("Form is rendering");
  console.log("Current books array:", books);

  const [formData, setFormData] = useState({ title: "", author: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedBook) {
      setFormData({ title: selectedBook.title, author: selectedBook.author });
      console.log("Editing book:", selectedBook);
    }
  }, [selectedBook]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim input values to remove extra spaces
    const trimmedTitle = formData.title.trim();
    const trimmedAuthor = formData.author.trim();

    // REVIEW - Validate that both fields are filled
    if (!trimmedTitle || !trimmedAuthor) {
      setError("Please enter both the Title and the Author");
      console.log("Form Not Submitted - Missing Fields");
      return;
    }

    // REVIEW - Check for duplicate books ONLY if it's not the book being edited
    const isDuplicate = books.some(
      (book) =>
        book.title.toLowerCase() === trimmedTitle.toLowerCase() &&
        book.author.toLowerCase() === trimmedAuthor.toLowerCase() &&
        (!selectedBook || book.id !== selectedBook.id)
      //REVIEW -  Allowinng current book during editing
    );

    if (isDuplicate) {
      setError("This book already exists.");
      console.log("Duplicate book found");
      return;
    }

    setError("");

    // REVIEW - Prepare the book object, reusing ID if editing
    const bookToAdd: Book = {
      id: selectedBook
        ? selectedBook.id
        : Math.max(...books.map((book) => book.id), 0) + 1,
      title: trimmedTitle,
      author: trimmedAuthor,
    };

    onAdd(bookToAdd);
    setFormData({ title: "", author: "" });
    setError("");
    clearSelectedBook();
    console.log(selectedBook ? "Book updated" : "Book added", bookToAdd);
  };

  return (
    <div className="form-wrapper">
      {selectedBook && (
        <h2 className="text-center my-3 text-primary">
          Editing: {selectedBook.title}
        </h2>
      )}
      {error && <p className="text-danger text-center">{error}</p>}
      <BootstrapForm onSubmit={handleSubmit} className="mb-3">
        <FormInput
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <FormInput
          name="author"
          value={formData.author}
          onChange={handleInputChange}
        />
        <FormButton text={(selectedBook && "Update Book") || "Add Book"} />
      </BootstrapForm>
    </div>
  );
};
export default Form;
