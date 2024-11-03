import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, user, logOut } = useContext(UserContext);
  const { itemCount } = useContext(CartContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

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
                {isLoggedIn ? (
                  <>
                    <Nav.Link>
                      <FaUser className="mx-2 fs-2" />
                      <span className="fs-5">{user.name}</span>
                    </Nav.Link>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <FaShoppingCart className="mx-2 fs-2" />
                        <span className="fs-5">{itemCount}</span>
                      </Nav.Link>
                    </LinkContainer>
                    <Nav.Link className="fs-5 mx-3" onClick={handleLogout}>
                      <IoLogOut className="mx-2 fs-2" />
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaUser className="mx-2 fs-2" />
                      <span className="fs-5">Sign In</span>
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
