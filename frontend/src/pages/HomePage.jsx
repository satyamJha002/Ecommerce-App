import React from "react";
import useFetch from "../hooks/useFetch";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";

const HomePage = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/products/"
  );
  return (
    <>
      {loading && <div>Loading Products...</div>}

      {error && <div>{error}</div>}
      <Row>
        {data?.products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
