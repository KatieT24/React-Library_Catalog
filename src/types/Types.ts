// REVIEW - Book interface for all books used in the app.
// NOTE - ID is a string because MockAPI returns string IDs.
export interface Book {
  id: string;
  title: string;
  author: string;
  checked: boolean;
  deleted: boolean;
}

// REVIEW - For creating new books (no ID required).
export type NewBook = Omit<Book, "id">;

// REVIEW - Props for the main book form (create/update).
export interface BookFormProps {
  onAdd: (book: Book) => void;
  selectedBook: Book | null;
  books: Book[];
  onDelete?: (id: string) => void;
  onEdit?: (book: Book) => void;
  clearSelectedBook: () => void;
  onSave?: () => void;
}

// REVIEW - Props for each individual book item in the list.
export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onSaveEdit: (updatedBook: Book) => void;
}

// REVIEW - Props for the full book list.
export interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
  onSelectBook: (id: string) => void;
  selectedBookIds: string[];
}

// REVIEW - Props and setters for context state management.
export interface BookContextTypes {
  allBooks: Book[];
  setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  selectedBook: Book | null;
  setSelectedBook: React.Dispatch<React.SetStateAction<Book | null>>;
  selectedBookIds: string[];
  setSelectedBookIds: React.Dispatch<React.SetStateAction<string[]>>;
}

// REVIEW - ListItemProps (if you use it for custom list logic).
export interface ListItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedBook: Book) => void;
}

// REVIEW - Page layout wrapper props.
export interface LayoutProps {
  children?: React.ReactNode;
}

// REVIEW - Props for the AddBook form (used in Home.tsx).
export interface AddBookFormProps {
  onAdd: (book: Book | NewBook) => void;
  selectedBook: Book | null;
  books: Book[];
  clearSelectedBook: () => void;
  onEdit: (book: Book) => void;
  onSave: () => void;
}

// REVIEW - Props for controlled form inputs.
export interface FormInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// REVIEW - Props used to load and erase test data.
export interface TestDataProps {
  setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  // NOTE - Function to set the book list state, used for loading and erasing test data
}

// REVIEW - Props for reusable form submit button.
export interface FormButtonProps {
  text: string;
}
