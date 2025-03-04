export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface ListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onEdit: (book: Book) => void; // NOTE - updated to pass the full book object
}

export interface AddBookFormProps {
  onAdd: (book: Book) => void;
  selectedBook: Book | null;
  books: Book[];
  clearSelectedBook: () => void;
}

export interface FormInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TestDataProps {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  //NOTE -  Function to set the book list state, used for loading and erasing test data
}

export interface FormButtonProps {
  text: string;
}
