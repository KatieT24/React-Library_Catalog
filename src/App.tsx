import "./App.css";
import { useState } from "react";
import Title from "./Title";
import AddBookForm from "./Form";
import List from "./List";
import TestData from "./TestData";
import { Book } from "./Types";
import "bootstrap/dist/css/bootstrap.min.css";

// NOTE - i had to research that App.tsx and Main.tsx are two separate files.
// The Main.tsx file is rendering the application, and the App.tsx file is the main file being rendered.
// It took a while to figure out the issues that came with it.

//NOTE - updated all the code and files and got rid of previous old code that was clutering up the files

function App() {
  // State to manage the list of books
  // Using the 'Book' interface instead of manually defining the state type
  const [books, setBooks] = useState<Book[]>([]);

  // NOTE - Each book has a unique ID using Date.now() for tracking
  const handleAddBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, { ...book, id: Date.now() }]);
    console.log("Book added:", book);
  };

  // NOTE - Changed from index-based deletion to ID-based deletion to avoid issues with index shifting
  const handleDeleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    console.log("Book deleted:", id);
  };

  // NOTE - Function to handle editing books
  // Uses the map() function to ensure state updates are immutable
  const handleEditBook = (id: number, updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? updatedBook : book))
    );
    console.log("Book edited:", id, updatedBook);
  };

  console.log("Application is rendering");

  return (
    <div className="app-container">
      <Title />
      <p className="text-center">Let's start making a Book List!</p>

      {/* updated book input */}
      <div className="book-form">
        <AddBookForm onAdd={handleAddBook} />
      </div>

      {/* fixed styling*/}
      <div className="list-container">
        <List
          books={books}
          onDelete={handleDeleteBook}
          onEdit={handleEditBook}
        />
      </div>

      {/* fixed the test data stuff */}
      <div className="test-data-buttons">
        <TestData setBooks={setBooks} />
      </div>
    </div>
  );
}

console.log("App.tsx is rendering");

export default App;
