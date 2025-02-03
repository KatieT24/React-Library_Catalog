import { useState } from "react";
import Title from "./Title";
import AddBookForm from "./Form";
import List from "./List";
import TestData from "./TestData";

//NOTE -  i had to reserch that app.tsx and main.tsx was two separate 'files'. thr Main.tsx file is
// rendering the application and the app.tsx file is the main file being rendered.
// it took a while to figure out the issues that came with it.

function App() {
  const [books, setBooks] = useState<{ title: string; author: string }[]>([]);

  const handleAddBook = (book: { title: string; author: string }) => {
    setBooks([...books, book]); //NOTE - This function add book to the list.
    console.log("book added:", book);
  };

  const handleDeleteBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
    console.log("book deleted at index:", index);
  };

  console.log("Application is rendering");
  return (
    <div className="app-container">
      <Title />
      <p>Lets start making a Book List!</p>
      <AddBookForm onAdd={handleAddBook} />
      <List books={books} onDelete={handleDeleteBook} />
      <TestData setBooks={setBooks} />
    </div>
  );
}
console.log("App.tsx is rendering");

export default App;
