// NOTE: This component was used for testing but is now replaced by MockAPI.
// Keeping it for reference, but it's no longer imported or used.

/*
import React from "react";
import { Book } from "../../types/Types";

// NOTE - Using the imported Book type

// NOTE - Props for the TestData component
interface TestDataProps {
  setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>; // Function to update the parent book state
}

const TestData: React.FC<TestDataProps> = ({ setAllBooks }) => {
  // NOTE - Local test data is defined within this component

  const testBooks: Book[] = [
    { id: 101, title: "The Hobbit", author: "J.R.R. Tolkien" },
    { id: 102, title: "Catcher in the Rye", author: "J.D. Salinger" },
  ];

  // NOTE - Function to load the test data into the parent state

  const loadTestData = () => {
    setAllBooks((prevBooks) => [...prevBooks, ...testBooks]);
    //NOTE - merging the test data with existing data

    console.log("Test data loaded:", testBooks);
  };

  // NOTE - Updated function to remove only the test data while keeping
  // user-added books in the parent state.
  const eraseTestData = () => {
    setAllBooks((prevBooks) =>
      //NOTE - This will help filter out the test data while preserving
      //NOTE - the user-added books
      prevBooks.filter(
        (book) =>
          !testBooks.some(
            (testBook) =>
              testBook.title === book.title && testBook.author === book.author
          )
      )
    );
    //NOTE - Confirming that the test data has been deleted.
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
*/
