import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const { signUp, erro, loading } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await signUp(formData);

    navigate("/login");
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <Card className="shadow bg-dark">
            <Card.Body className="text-light">
              <div className="mb-3 mt-4">
                <h2 className="fw-bold mb-5">ShopMart</h2>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formFullName"
                    >
                      <Form.Label className="text-center">
                        Your full name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formUsername"
                    >
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="email"
                          placeholder="Enter username"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                        <InputGroup.Text className="text-primary">
                          @gmail.com
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <div className="d-grid">
                    <Button variant="light" type="submit">
                      Sign Up
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-light text-decoration-none mx-1 fw-bold"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
