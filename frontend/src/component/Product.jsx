import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`product/${product._id}`}>
        <Card.Img
          variant="top"
          src={
            product.images.length === 0
              ? "https://images.unsplash.com/photo-1527747471697-174c755627dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              : product.images[0]
          }
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product._id}`}
          className="text-black text-decoration-none font-monospace"
        >
          <Card.Title as="div">
            <strong>{product.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="text" className="fs-5 fw-bold text-muted font-monospace">
          Rs. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
