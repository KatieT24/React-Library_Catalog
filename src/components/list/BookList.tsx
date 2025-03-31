import React, { useState, useEffect} from "react";
import {  useBookContext, API_URL } from "../shared/BookContext"; //REVIEW - Import context and API URL
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Book } from "../../types/Types";
import LoadingIndicator from "../shared/LoadingIndicator"


// NOTE - Updating this component to support both static and API-driven data
// REVIEW - The BookList displays all books with edit and delete options


const BookList: React.FC = () => {
  const {
    allBooks, //NOTE -  List of all books fetched from the API or mock data
    selectedBook, //NOTE -  The currently selected book for editing
    setSelectedBook, //NOTE -  Function to update the selected book
    setAllBooks, //NOTE -  Function to update the list of all books
    setSelectedBookIds, //NOTE -  Function to update the list of selected book IDs
  } = useBookContext(); //NOTE -  Accessing the context to manage books

  //NOTE - adding on loading indicator. 
  const [loading, setLoading] = useState(true);

  //NOTE - Using useEffect to fetch books when the component mounts 
  useEffect(() => {
    const fetchBooks = async () => {
      console.log("Fetching books..."); // Log when fetching starts
      try {
        const response = await fetch(API_URL); //NOTE - Fetching the books from API
        const data = await response.json(); //NOTE - Convert the response to JSON
        setAllBooks(data);
        setLoading(false); // Stop loading after data is fetched
        console.log("Books fetched successfully!"); // Log after fetching is done
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false); // Stop loading on error as well
      }
    };

    fetchBooks();
  }, [setAllBooks]);


  // REVIEW - Handling DELETE action for full API deletion (removes the book)
  const handleDeleteBook = async (id: string) => {
    console.log(`Attempting to delete book with ID: ${id}`); //NOTE -  Log when attempting to delete a book
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" }); //NOTE -  DELETE request to API
      if (!response.ok) throw new Error("Failed to delete book"); //NOTE -  Check if the response is not ok

      //NOTE - If deletion is successful, update the state and remove the deleted book from the list
      setAllBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));

      //NOTE -  Clear the selected book if the deleted book was selected
      if (selectedBook?.id === id) {
        setSelectedBook(null);
      }

      //NOTE -  Remove the deleted book's ID from the selected book IDs
      setSelectedBookIds((prev) => prev.filter((bookId) => String(bookId) !== id));
    } catch (error) {
      console.error("Delete error:", error); //NOTE -  Log error if deletion fails
    }
  };

  // REVIEW - Handles the checkbox toggle logic and updates the book's checked status
  const handleSelectBook = async (book: Book) => {
    const updatedBook = { ...book, checked: !book.checked }; //NOTE -  Toggle the checked property of the book

    try {
      const response = await fetch(`${API_URL}/${book.id}`, { //NOTE -  PUT request to API to update the book
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook), //NOTE -  Send the updated book data
      });

      if (!response.ok) throw new Error("Failed to update book"); //NOTE -  Check if the response is not ok

      const updated = await response.json(); //NOTE -  Get the updated book data
      setAllBooks((prevBooks) =>
        prevBooks.map((b) => (b.id === updated.id ? updated : b)) //NOTE -  Update the book in the state
      );
    } catch (err) {
      console.error("Error updating checkbox:", err); //REVIEW -  Log error if update fails
    }
  };

  return (
    <div>
      {/*NOTE -  Render LoadingIndicator if data is still being fetched */}

      {loading ? (
        <LoadingIndicator />
      ) : (
        <Row className="g-4">
         
          {/*NOTE -  Map through allBooks and render each book in a Card */}
          {allBooks.map((book) => (
            <Col key={book.id} md={3}>
              <Card className="card">
                <Card.Body>

                  {/*NOTE -  Checkbox to toggle selection of a book */}
                  <Form.Check>
                    <Form.Check.Input
                      type="checkbox"
                      checked={book.checked}
                      onChange={() => handleSelectBook(book)} // NOTE -  Update checked status when checkbox changes 
                      title="Check to send to review page"
                    />
                  </Form.Check>

                  {/*NOTE -  Display the book's title and author */}
                  <Card.Title className="card-title">{book.title}</Card.Title>
                  <Card.Subtitle className="card-subtitle">{book.author}</Card.Subtitle>

                  <div className="button-group">

                    {/*NOTE -  Button to edit the selected book */}
                    <Button onClick={() => setSelectedBook(book)} className="btn-edit">
                      Edit
                    </Button>

                    {/*NOTE -  Button to delete the book */}
                    <Button onClick={() => handleDeleteBook(book.id)} className="btn-delete">
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default BookList;