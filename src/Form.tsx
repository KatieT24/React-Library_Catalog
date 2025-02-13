import React, { useState } from "react";
import { AddBookFormProps } from "./Types";
import { Form, Button } from "react-bootstrap";
//NOTE - this is a hook, a hook is a function that lets me use a state
// variable. This will store the input from the text field and updates as the user types
// added more hooks to function for eveything to be working across the app.

//NOTE - making adjustments from old code to new code for the AddBookForm component.
const AddBookForm: React.FC<AddBookFormProps> = ({ onAdd }) => {
  console.log("AddBookForm is rendering");

  const [input, setInput] = useState("");
  //NOTE - wanted to have the input together in one state.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); //NOTE - prevents the page from refeshing when the for is submitted
    // and the data is sent to the server. This lets the page stay the same

    const [title, author] = input.split(" - ");
    //NOTE - this is splitting the input into two parts, the title and author. This assumes
    // the user enters the data in the format of "title - author".

    console.log("form is working:", title, author);

    if (title && author) {
      // onAdd({ title: title.trim(), author: author.trim() });
      onAdd({ id: Date.now(), title: title.trim(), author: author.trim() });
      setInput("");
      //NOTE - this is the functionm that is being pass from the parent component
      // to the child component. trim() is used to take care of any extra spaces.
      //NOTE - the setInput clears ater submission.

      console.log("form is working: title =", title, "Author =", author);
    } else {
      alert("Please enter the book in this format: Title - Author");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Group>
        <p className="mb-2">Add Your Books</p>
        <Form.Control
          id="bookInput"
          name="book"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Book as Title - Author"
          autoComplete="off"
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mt-2">
        Add Book
      </Button>
    </Form>
  );
};

export default AddBookForm;
