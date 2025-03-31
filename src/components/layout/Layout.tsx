import React from "react";
import { Outlet } from "react-router-dom"; //NOTE -  Outlet is used to render the child components of the route
import AppNavbar from "./Navbar"; //NOTE -  Navbar component to display the site's navigation bar

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <AppNavbar /> {/* NOTE - The AppNavbar is rendered at the top of the page, providing navigation links to the user */}
      
      <main>
        {/* NOTE - The Outlet component is responsible for rendering the child components based on the current route.
          For example, when the user navigates to "/home", the corresponding Home component will be rendered inside this Outlet. */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
