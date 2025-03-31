import React from "react";
import ReactDOM from "react-dom/client";
import { BookProvider } from "./components/shared/BookContext"; // Global Context provider for managing book state
import App from "./App"; // Main application component
import "./index.css"; // Global styles for the app
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles for layout and components

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Rendering the App component wrapped in the BookProvider context provider
root.render(
  <React.StrictMode>
    {/* NOTE - BookProvider provides the global book state to the app */}
    <BookProvider>

      {/* NOTE - App component is the main entry point for rendering the app */}
      <App />
      
    </BookProvider>
  </React.StrictMode>
);
// NOTE - This code initializes the React application, sets up global state management for books, and applies global styles.