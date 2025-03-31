import React, { useEffect } from "react";
import BookList from "../components/list/BookList"; //NOTE -  Importing the BookList component to display books
import Form from "../components/form/Form"; //NOTE  Importing the Form component to handle adding/editing books
import { Book, NewBook } from "../types/Types"; //NOTE - Importing types for Book and NewBook
import { useBookContext, API_URL } from "../components/shared/BookContext"; // Accessing context and API URL

const Home: React.FC = () => {
  //NOTE -  Extracting state and functions from context
  const { allBooks, setAllBooks, selectedBook, setSelectedBook } = useBookContext();

  // NOTE - Load initial book data from API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL); //NOTE -  Fetch data from the mock API
        const data: Book[] = await response.json(); //NOTE -  Convert response to JSON
        const filtered = data.filter((book) => !book.deleted); //NOTE -  Filter out deleted books
        setAllBooks(filtered); //NOTE -  Update state with filtered books
      } catch (error) {
        console.error("Error fetching books:", error); //NOTE -  Log error if fetching fails
      }
    };

    fetchBooks(); //NOTE -  Call the function to load books
  }, []); //NOTE -  Empty dependency array ensures this runs only once after initial render

  //NOTE -  Function to add a new book via API POST request
  const handleAddBook = async (book: NewBook) => {
    const response = await fetch(API_URL, {
      method: "POST", //NOTE -  POST method to add a new book
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...book,
        checked: false,
        deleted: false,
      }), //NOTE -  New book data with default checked and deleted values
    });

    const createdBook = await response.json(); //NOTE -  Parse the response as a book object
    setAllBooks((prevBooks) => [...prevBooks, createdBook]); //NOTE -  Update the state with the new book
  };

  // Function to update an existing book via API PATCH request
  const handleUpdateBook = async (book: Book) => {
    try {
      const response = await fetch(`${API_URL}/${book.id}`, {
        method: "PATCH", //NOTE -  PATCH method to update an existing book, as Patch is used to update specific fields. 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          checked: book.checked,
          deleted: book.deleted,
        }), // Update book data
      });

      if (!response.ok) {
        throw new Error("Failed to update book"); //NOTE -  Throw error if the update fails
      }

      const updatedBook = await response.json(); //NOTE -  Parse the updated book
      setAllBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b)) //NOTE -  Update the list of books in state
      );
    } catch (error) {
      console.error("Error updating book:", error); //NOTE -  Log error if update fails
    }
  };

  //NOTE -  Function to decide whether to create a new book or update an existing one
  const handleSubmitBook = async (book: Book | NewBook) => {
    if ("id" in book) {
      await handleUpdateBook(book); //NOTE -  If book has an ID, update it
    } else {
      await handleAddBook(book); //NOTE -  If book doesn't have an ID, create a new one
    }
    setSelectedBook(null); //NOTE -  Clear the selected book after submission
  };

  return (
    <div className="app-container container py-4">
      <h1 className="text-center mb-4">Book Library</h1>

      {/*NOTE -  Render the Form component to add or edit a book */}
      <Form
        onAdd={handleSubmitBook} //NOTE -  Function to handle adding or editing a book
        books={allBooks} //NOTE -  Pass the list of all books
        selectedBook={selectedBook} //NOTE -  Pass the currently selected book (for editing)
        clearSelectedBook={() => {
          setSelectedBook(null); //NOTE -  Clear the selected book when no longer editing
          console.log("Cleared selectedBook");
        }}
        //NOTE -  Added temporarily for prop type compatibility
        onEdit={setSelectedBook} //NOTE -  Function to handle selecting a book for editing
        onSave={() => {}} //NOTE -  Placeholder for save function (no-op here)
      />

      {/*NOTE -  Render the BookList component to display all books */}
      <div className="my-3"></div>

      <BookList /> {/*NOTE -  Display the list of books */}
    </div>
  );
};

export default Home;
