import { useBookContext } from "../components/shared/BookContext";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";

const Review: React.FC = () => {
  const { allBooks, setAllBooks } = useBookContext();
  const navigate = useNavigate();

  // NOTE - Filter books that are checked
  const selectedBooks = allBooks.filter((book) => book.checked);

  // NOTE - Function to clear checked status for all books
  const clearCheckedBooks = () => {
    setAllBooks((prevBooks) =>
      prevBooks.map((book) => ({
        ...book,
        checked: false, //NOTE -  Reset the checked status for all books
      }))
    );
  };

  // NOTE - Navigate to the print page
  const handleFinalize = () => {
    navigate("/print");
  };

  return (
    <div className="app-container">
      <div className="frosted-container">
        <h1 className="page-title">Review Selected Books</h1>
        <p>Review books before finalizing the list.</p>

        {selectedBooks.length === 0 ? (

          // NOTE - If no books are selected, show a message
          <p className="text-muted">No books selected yet. Get your books!</p>
        ) : (
          <>
            <ul className="list-group">
              {selectedBooks.map((book) => (
                <li key={book.id} className="list-group-item">
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))}
            </ul>

            <div className="mt-3">

              {/* NOTE - Button to clear checked books */}
              <Button className="btn btn-warning me-2" onClick={clearCheckedBooks}>
                Clear Checked Books
              </Button>

              {/* NOTE - Button to finalize and go to print page */}
              <button className="btn btn-success" onClick={handleFinalize}>
                Finalize List
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
