import { useBookContext } from "../components/shared/BookContext"; //NOTE - Importing context to access all books
import React from "react"; //NOTE - Importing React library

const PrintList: React.FC = () => {
  //NOTE - Access all books from the BookContext
  const { allBooks } = useBookContext();
  
  //NOTE - Filter out the checked books (selected books) to show only those
  const checkedBooks = allBooks.filter((book) => book.checked);

  //NOTE - Function to handle the printing of the selected books
  const handlePrint = () => {
    //REVIEW - Logic to print the list (currently logs to the console for demonstration)
    console.log("Printing books:", checkedBooks); 
  };

  return (
    <div className="app-container">
      <div className="frosted-container">
        <h1 className="page-title">Print List</h1>
        
        <p>Review and print your selected books.</p> {/*NOTE - Instructions for the user */}

        {/*NOTE - If no books are selected for printing, display this message */}
        {checkedBooks.length === 0 ? (
          <p className="text-muted">No books to print yet.</p> //NOTE - Message if no books are selected
        ) : (
          <>
            {/*NOTE - List of selected books */}
            <ul className="list-group">
              {checkedBooks.map((book) => (
                <li key={book.id} className="list-group-item">
                  <strong>{book.title}</strong> by {book.author} 
                </li>
              ))}
            </ul>

            {/*NOTE - Button to print the list */}
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handlePrint}>
                Print List 
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrintList;
