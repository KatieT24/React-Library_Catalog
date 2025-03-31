import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import routing utilities from react-router-dom
import Layout from "./components/layout/Layout"; // Layout component that wraps other pages
import Home from "./pages/Home"; // Home page component where users can add and see books
import Review from "./pages/Review"; // Review page for reviewing selected books
import PrintList from "./pages/PrintList"; // PrintList page for showing books that can be printed
import "./App.css"; // App-level styles, including custom styles for the entire app

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* NOTE - BrowserRouter wraps the entire routing system for client-side navigation */}
      <Routes>

        {/* NOTE - Layout component is the wrapper for all pages; it includes the navbar */}
        <Route path="/" element={<Layout />}>

          {/* NOTE - Home component is rendered at the root ("/") route */}
          <Route index element={<Home />} />

          {/* NOTE - Review page is rendered when user navigates to "/review" */}
          <Route path="review" element={<Review />} />
          
          {/* NOTE - PrintList page is rendered when user navigates to "/print" */}
          <Route path="/print" element={<PrintList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
