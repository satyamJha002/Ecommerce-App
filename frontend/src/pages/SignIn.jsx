import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow bg-dark">
            <Card.Body className="text-light">
              <div className="mb-3 mt-3">
                <Form className="mb-3">
                  <h2 className="fw-bold mb-5">ShopMart</h2>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <div className="mb-3">
                    <p className="small">
                      <a className="text-primary" href="#!">
                        Forgot password?
                      </a>
                    </p>
                  </div>
                  <div className="d-grid">
                    <Button variant="light" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0 text-center">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="text-light text-decoration-none fw-bold mx-lg-1"
                    >
                      Sign Up
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

export default SignIn;
