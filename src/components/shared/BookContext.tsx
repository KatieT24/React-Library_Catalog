import React, { createContext, useContext, useState } from "react"; //NOTE -  Importing necessary React hooks
import { Book, BookContextTypes } from "../../types/Types"; //NOTE -  Importing types for books and context

//REVIEW -  -  1. Create the actual context
// Creating the BookContext to hold and provide state related to books across the app
// `undefined` is used as the default value, which will be replaced when the provider is used

export const BookContext = createContext<BookContextTypes | undefined>(undefined);

// Defining the API_URL for fetching book data from the mock API
export const API_URL = "https://67d5ab59286fdac89bc013f6.mockapi.io/api/books/books";

//REVIEW -  -  2. Make a provider so we can wrap our app in it
// BookProvider is a component that wraps the entire app, providing the BookContext to all child components
// It holds the main state and passes it to components using the context
// This also makes organizing the application much easier, as instead of passing props down through 
// 7 levels of nested components, 
// the context provides a clean, centralized way to access the state. 
// This separation makes the app more modular and easier to manage.

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allBooks, setAllBooks] = useState<Book[]>([]); //NOTE -  State to hold all books fetched from API or mock data
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //NOTE -  State to track the currently selected book
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]); //NOTE -  State to keep track of the IDs of selected books

  //REVIEW -  Returning the provider component with the values to share across the app
  return (
    <BookContext.Provider value={{ 
      allBooks, //NOTE -  Providing state for all books
      setAllBooks, //NOTE -  Providing the function to update the list of all books
      selectedBook, //NOTE -  Providing state for the selected book
      setSelectedBook, //NOTE -  Providing the function to set the selected book
      selectedBookIds, //NOTE -  Providing state for the IDs of selected books
      setSelectedBookIds, //REVIEW -  Providing the function to update selected book IDs
    }}>
      {children} {/*NOTE -  Rendering the children passed into the BookProvider */}
    </BookContext.Provider>
  );
};

//REVIEW -  3. Custom hook to use the context safely
// This custom hook ensures that components can access the BookContext in a safe and readable way
// It also throws an error if the context is used outside of a BookProvider
export const useBookContext = () => {
  const context = useContext(BookContext); // Access the context using useContext hook
  if (!context) { // If context is undefined, it means the component is not wrapped in a BookProvider
    throw new Error("useBookContext must be used within a BookProvider"); // Throw an error for better debugging
  }
  return context; //REVIEW -  Return the context for use in child components
};
