export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface ListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedBook: Book) => void;
}

export interface AddBookFormProps {
  onAdd: (book: Book) => void;
}

export interface TestDataProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  //NOTE -  Function to set the book list state, used for loading and erasing test data
}
