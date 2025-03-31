import { Link, useLocation } from "react-router-dom"; //NOTE -  Import Link for routing and useLocation to get the current page's URL
import { Navbar, Nav, Container } from "react-bootstrap"; //NOTE -  Import necessary Bootstrap components for styling

const AppNavbar: React.FC = () => {
  const location = useLocation(); // NOTE - Use the location hook to get the current page's URL (pathname)
  
  // NOTE - Check if we are on the Home page, Review page, or Print page
  const isHomePage = location.pathname === "/"; 
  const isReviewPage = location.pathname === "/review";
  const isPrintPage = location.pathname === "/print";

  return (
    <Navbar expand="md" className="custom-navbar shadow-sm mb-4">
      <Container>
        {/* NOTE - Conditionally render the title as a link or plain text based on the current page */}
        {isHomePage ? (
          <Navbar.Brand className="navbar-brand" style={{ cursor: "default" }}>
            Book Library
          </Navbar.Brand>
        ) : (
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            Book Library
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* NOTE - Conditionally render Home Link */}
            {isHomePage ? (
              <span className="nav-link" style={{ color: "black" }}>
                Home
              </span>
            ) : (
              <Nav.Link as={Link} to="/" className="nav-link">
                Home
              </Nav.Link>
            )}

            {/* NOTE - Conditionally render Review Link */}
            {isReviewPage ? (
              <span className="nav-link" style={{ color: "black" }}>
                Review
              </span>
            ) : (
              <Nav.Link as={Link} to="/review" className="nav-link">
                Review
              </Nav.Link>
            )}

            {/* NOTE - Conditionally render Print List Link */}
            {isPrintPage ? (
              <span className="nav-link" style={{ color: "black" }}>
                Print List
              </span>
            ) : (
              <Nav.Link as={Link} to="/print" className="nav-link">
                Print List
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
