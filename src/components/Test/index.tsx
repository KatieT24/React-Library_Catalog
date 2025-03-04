import React from "react";
import { Book } from "../../types/Types";

// NOTE - Using the imported Book type

// NOTE - Props for the TestData component
interface TestDataProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>; // Function to update the parent book state
}

const TestData: React.FC<TestDataProps> = ({ setBooks }) => {
  // NOTE - Local test data is defined within this component

  const testBooks: Book[] = [
    { id: 0, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 1, title: "Fahrenheit 451", author: "Ray Bradbury" },
    {
      id: 2,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
    },
  ];

  // NOTE - Function to load the test data into the parent state

  const loadTestData = () => {
    setBooks((prevBooks) => [...prevBooks, ...testBooks]);
    //NOTE - merging the test data with existsing data

    console.log("Test data loaded:", testBooks);
  };

  // NOTE - updated function to remove only the test data while keeping
  // user-added books in the parent state.
  const eraseTestData = () => {
    setBooks((prevBooks) =>
      //NOTE - this will help filter out the test data  while preserving
      //NOTE - the user added books
      prevBooks.filter(
        (book) =>
          !testBooks.some(
            (testBook) =>
              testBook.title === book.title && testBook.author === book.author
          )
      )
    );
    //NOTE - confirmin that the test data has been deleted.
    console.log("Test data erased.");
  };

  return (
    <>
      <button onClick={loadTestData} className="btn btn-secondary">
        Load Test Data
      </button>
      <button onClick={eraseTestData} className="btn btn-danger">
        Erase Test Data
      </button>
    </>
  );
};

export default TestData;
