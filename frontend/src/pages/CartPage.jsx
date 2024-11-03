import React, { useContext, useEffect } from "react";
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total, loading, error, fetchCartItems, removeItemFromCart } =
    useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) fetchCartItems(user._id);
  }, [user]);

  if (error) {
    return <div>Error...{error}</div>;
  }

  return (
    <Container>
      {cart.length === 0 ? (
        <div>Your Cart is empty</div>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.productId._id}>
              <Row>
                <Col md={5}>
                  {item.productId.images && item.productId.images.length > 1 ? (
                    <Image
                      src={item.productId.images[1]}
                      fluid
                      style={{
                        width: "30%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  ) : (
                    <div>No Second Image Available</div>
                  )}
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>{item.productId.title}</ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>
                      Specification: {item.productId.specs}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <ListGroup>
                    <ListGroup.Item>Rs. {item.productId.price}</ListGroup.Item>
                  </ListGroup>
                  <ListGroup>
                    <ListGroup.Item>Qty: {item.quantity}</ListGroup.Item>
                  </ListGroup>

                  <ListGroup>
                    <ListGroup.Item>
                      <Button
                        variant="danger"
                        onClick={() => removeItemFromCart(user._id, item._id)}
                      >
                        Remove
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <h3>Total: Rs. {total}</h3>
      <Link to="/checkout">
        <Button className="mt-3" variant="primary">
          Procceed to checkout
        </Button>
      </Link>
    </Container>
  );
};

export default CartPage;
