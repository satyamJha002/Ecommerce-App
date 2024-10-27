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
            <Navbar.Brand>ShopMart</Navbar.Brand>
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
                {/* <Nav.Link href="#action1">
                  <FaShoppingCart />
                  Cart
                </Nav.Link> */}
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser size="" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
                <NavDropdown
                  title="Product Categories"
                  id="offcanvasNavbarDropdown-expand-xl"
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
