import "./App.css";
import { useState } from "react";
import Title from "./components/Title";
import AddBookForm from "./components/Form/Form";
import List from "./components/List/List";
import TestData from "./components/Test";
import { Book } from "./types/Types";
import "bootstrap/dist/css/bootstrap.min.css";
// NOTE - i had to research that App.tsx and Main.tsx are two separate files.
// The Main.tsx file is rendering the application, and the App.tsx file is the main file being rendered.
// It took a while to figure out the issues that came with it.

//NOTE - updated all the code and files and got rid of previous old code that was clutering up the files

function App() {
  // State to manage the list of books
  // Using the 'Book' interface instead of manually defining the state type
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const clearSelectedBook = () => setSelectedBook(null);

  // NOTE - Each book has a unique ID using Date.now() for tracking
  const handleAddBook = (book: Book) => {
    if (selectedBook) {
      // REVIEW - We're editing: update the existing book and keep its original id
      setBooks((prevBooks) =>
        prevBooks.map((b) =>
          b.id === selectedBook.id ? { ...book, id: selectedBook.id } : b
        )
      );
      console.log("Book edited:", book);
      clearSelectedBook();
    } else {
      // REVIEW - We're adding a new book
      const duplicate = books.find(
        (b) =>
          b.title.toLowerCase() === book.title.toLowerCase() &&
          b.author.toLowerCase() === book.author.toLowerCase()
      );

      if (duplicate) {
        alert("This book already exists!");
        return;
      }

      setBooks((prevBooks) => [...prevBooks, { ...book, id: Date.now() }]);
      console.log("Book added:", book);
    }
  };
  // NOTE - Changed from index-based deletion to ID-based deletion to avoid issues with index shifting
  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    console.log("Book deleted:", id);
  };

  // NOTE - Function to handle editing books
  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    console.log("Editing book:", book);
  };

  console.log("Application is rendering");

  return (
    <div className="app-container">
      <Title />
      <p className="text-center">Let's start making a Book List!</p>

      {/* Always-visible book form */}
      <div className="book-form">
        <AddBookForm
          onAdd={handleAddBook}
          selectedBook={selectedBook}
          books={books}
          clearSelectedBook={clearSelectedBook}
        />
      </div>

      {/* List of books */}
      <div className="list-container">
        <List
          books={books}
          onDelete={handleDeleteBook}
          onEdit={handleEditBook}
        />
      </div>

      {/* Test data buttons */}
      <div className="test-data-buttons">
        <TestData setBooks={setBooks} />
      </div>
    </div>
  );
}

console.log("App.tsx is rendering");

export default App;
