import React from "react";

interface Book {
  title: string;
  author: string;
}

interface testDataProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const TestData: React.FC<testDataProps> = ({ setBooks }) => {
  const testBooks = ([] = [
    { title: "The Great Gatsby", author: "F.Scott Fitzgerald" },
    { title: "Fahrenheit 451", author: "Ray Bradbury" },
    { title: "Harry Potter and the Sorceroer's stone", author: "JK Rowling" },
  ]);

  const loadTestData = () => {
    setBooks(testBooks);
    console.log("Test data loaded");
  };

  const eraseTestData = () => {
    setBooks([]);
    console.log("test data erased");
  };

  return (
    <>
      <button onClick={loadTestData}>Load Test Data</button>
      <button onClick={eraseTestData}>Erase Test Data</button>
    </>
  );
};

export default TestData;
