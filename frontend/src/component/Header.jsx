import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        key="xl"
        expand="xl"
        className="bg-body-tertiary mb-3"
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="fs-2 font-font-monospace">
              ShopMart
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-xl" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-xl"
            aria-labelledby="offcanvasNavbarLabel-expand-xl"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-xl">
                ShopMart
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="mx-2 fs-2" />
                    <span className="fs-5">Sign In</span>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
