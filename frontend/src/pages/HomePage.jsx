import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import Product from "../component/Product";

const HomePage = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/products/"
  );

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterProducts, setFiltereProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    if (search && data?.products) {
      const filteredSuggestions = data?.products.filter((product) =>
        product.title.toLowerCase().includes(search)
      );
      setSuggestions(filteredSuggestions);
      setFiltereProducts(filteredSuggestions);
    } else {
      setSuggestions([]);
      setFiltereProducts(data?.products || []);
    }
  }, [search, data?.products]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickSuggestion = (suggest) => {
    setSelectedProduct(suggest);
    setSuggestions([]);
  };

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search}
          onChange={handleChange}
        />

        {suggestions.length > 0 && (
          <ListGroup
            style={{
              position: "absolute",
              zIndex: "1",
              top: "130px",
              right: "200px",
              width: "60%",
            }}
          >
            {suggestions.map((suggest) => (
              <ListGroup.Item
                key={suggest.id}
                style={{ color: "white", backgroundColor: "black" }}
                onClick={() => handleClickSuggestion(suggest)}
              >
                {suggest.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form>
      {loading && <div>Loading Products...</div>}

      {error && <div>{error}</div>}

      <div tabIndex="0" style={{ marginTop: "20px" }}>
        {selectedProduct && (
          <div>
            <h3>{selectedProduct.name}</h3>
            <p>{selectedProduct.details}</p>
          </div>
        )}
      </div>

      {filterProducts ? (
        <Row>
          {filterProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {data?.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomePage;
