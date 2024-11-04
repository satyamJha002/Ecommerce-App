import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/products/${product._id}`}>
          <Card.Img
            variant="top"
            src={
              product.images.length === 0
                ? "https://images.unsplash.com/photo-1527747471697-174c755627dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : product.images[1]
            }
            className="product-img"
          />
        </Link>
        <Card.Body>
          <Link
            to={`/products/${product._id}`}
            className="text-black font-monospace"
          >
            <Card.Title as="div" className="product-title">
              <strong>{product.title}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating value={product.rating} />
          </Card.Text>

          <Card.Text className="fs-5 fw-bold text-muted font-monospace">
            Rs. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
