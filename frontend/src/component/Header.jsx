import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartContext } from "../context/CartContext";

const Header = () => {
  const [cookies, removeCookie] = useCookies([]);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { logOut } = useCartContext();

  const verifyCookie = async () => {
    if (!cookies.token) {
      navigate("/login");
      return;
    }

    const response = await fetch("http://localhost:3000/api/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({}),
    });

    const data = await response.json();

    const { status, user } = data;
    setName(user);
  };

  useEffect(() => {
    verifyCookie();
  }, [navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    logOut;
    navigate("/login");
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
                {name ? (
                  <>
                    <Nav.Link>
                      <FaUser className="mx-2 fs-2" />
                      <span className="fs-5">Hello, {name}</span>
                    </Nav.Link>
                    <Nav.Link onClick={Logout} className="fs-5 mx-3">
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
