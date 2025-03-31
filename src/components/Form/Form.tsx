// REVIEW - Refactored the code for clarity, efficiency, and better organization. 
// Removed old comments and replaced with more concise explanations.

import React, { useState, useEffect } from "react";
import { Book, NewBook, AddBookFormProps } from "../../types/Types";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { Form as BootstrapForm } from "react-bootstrap";

// REVIEW - Refactored components folder by breaking down large components into smaller, more manageable files
// This makes the code easier to read and maintain without clutter.

// NOTE - Updated old logic for creating and updating books, especially props in types.tsx
// The Form component is responsible for both adding and updating books, with logic that handles form validation, 
// duplicate checking, and state resetting.

const Form: React.FC<AddBookFormProps> = ({
  onAdd,
  selectedBook,
  books,
  clearSelectedBook,
}) => {
  console.log("Form is rendering");
  console.log("Current books array:", books);

  //NOTE -  Form state to hold the title and author inputs
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [error, setError] = useState("");


  //NOTE -  If a book is selected for editing, pre-fill the form fields with the selected book's data
  useEffect(() => {
    if (selectedBook) {
      setFormData({ title: selectedBook.title, author: selectedBook.author });
      console.log("Editing book:", selectedBook);
    }
  }, [selectedBook]); //NOTE -  Runs whenever the selectedBook changes

  //NOTE -  Handles changes in the form inputs (title, author)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //NOTE -  Handles form submission (either adding or updating a book)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    //NOTE -  Trim input values to remove extra spaces
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
        (!selectedBook || book.id !== selectedBook.id) // Allow same book during edit
    );
  
    if (isDuplicate) {
      setError("This book already exists.");
      console.log("Duplicate book found");
      return;
    }
  
    setError("");//NOTE -  Clear the error if validation passed
  
    if (selectedBook) {

      // REVIEW - Editing: Prepare full Book object with existing ID
      const bookToUpdate: Book = {
        ...selectedBook,
        title: trimmedTitle,
        author: trimmedAuthor,
      };
  
      onAdd(bookToUpdate); // NOTE - Call the onAdd function passed from the parent to update the book
      console.log("Book updated", bookToUpdate);
    } else {
      // REVIEW - Adding: Create new book object without ID (API will assign one)
      const bookToAdd: NewBook = {
        title: trimmedTitle,
        author: trimmedAuthor,

        //NOTE -  by default these books are not checked.
        checked: false,
        deleted: false,
      };
  
      onAdd(bookToAdd); //NOTE - Call the onAdd function to add the new book
      console.log("Book added", bookToAdd);
    }
  
    // REVIEW - Clear form state and cancel edit mode if active
    setFormData({ title: "", author: "" });
    clearSelectedBook(); //NOTE - Clearing the selectedBook state to null. 
  };

  return (
    <div className="form-wrapper">
      {selectedBook && (
        <h2 className="text-center my-3 text-primary">
          Editing: {selectedBook.title}
        </h2>
      )}
      {error && <p className="text-danger text-center">{error}</p>} {/*NOTE -  Display error message if validation fails */}
      <BootstrapForm onSubmit={handleSubmit} className="mb-3">
        {/*NOTE -  FormInput component handles individual inputs for title and author */}
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
         {/*NOTE -  FormButton handles submission with dynamic text */}
        <FormButton text={(selectedBook && "Update Book") || "Add Book"} />

        {selectedBook && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              clearSelectedBook();
              setFormData({ title: "", author: "" }); // Clear input fields
              setError(""); // Clear error
              console.log("Edit canceled.");
            }}
          >
            Cancel Edit
          </button>
        )}
      </BootstrapForm>
    </div>
  );
};
export default Form;
