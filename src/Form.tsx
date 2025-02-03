import React, { useState } from "react";
//NOTE - this is a hook, a hook is a function that lets me use a state
// variable. This will store the input from the text field and updates as the user types

const AddBookForm = ({
  onAdd,
}: {
  onAdd: (book: { title: string; author: string }) => void;
  //NOTE - onAdd is a function passing from the parent component to the child component
  // ie the App.tsx file is the parent and the Form.tsx is the child. this will
  // allow the child to pass the "book" to the "catalog".
}) => {
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
      onAdd({ title: title.trim(), author: author.trim() });
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
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor="book" className="book">
          Book (Format: Title - Author)
        </label>
        <input
          type="text"
          id="book"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Book as Title - Author"
          autoComplete="off"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Book
      </button>
    </form>
  );

  //NOTE - this will be render the form and input field.
};
console.log("Form.tsx is loading");

export default AddBookForm;
