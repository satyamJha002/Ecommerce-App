import React, { useContext, useEffect } from "react";
import { Button, Col, Container, ListGroup, Row, Table } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, total, loading, error, fetchCartItems, removeItemFromCart } =
    useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchCartItems(user._id);
  }, [user, fetchCartItems]);

  if (error) {
    return <div>Error...{error}</div>;
  }

  return (
    <Container>
      <div>Your cart is empty</div>
      {cart.length === 0 ? (
        <div>Your Cart is empty</div>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <ListGroup.Item key={item.productId._id}>
              <Row>
                <Col md={6}>{item.productId.image}</Col>
                <Col md={4}>{item.productId.title}</Col>
                <Col md={3}>Rs. {item.productId.price}</Col>
                <Col md={2}>Qty: {item.quantity}</Col>
                <Col md={1}>
                  <Button
                    variant="danger"
                    onClick={() => removeItemFromCart(user._id, item._id)}
                  >
                    Remove
                  </Button>
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
