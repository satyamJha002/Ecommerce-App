import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import {
  Alert,
  Button,
  Col,
  Form,
  ListGroup,
  NavDropdown,
  Row,
  Spinner,
} from "react-bootstrap";
import Product from "../component/Product";
import { IoIosArrowForward } from "react-icons/io";
import PaginationComponent from "../component/Pagination";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filterProducts, setFiltereProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/v1/products/"
  );

  const {
    data: categories,
    error: categoriesError,
    loading: categoriesLoading,
  } = useFetch("http://localhost:3000/api/v1/categories");

  const { fetchCartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    if (user && user._id) fetchCartItems(user._id);
  }, [user]);

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

  useEffect(() => {
    if (selectedCategory) {
      const filterCategory = data?.products.filter((product) => {
        return product.category === selectedCategory;
      });
      setFiltereProducts(filterCategory);
    } else {
      setFiltereProducts(data?.products || []);
    }
  }, [selectedCategory, data?.products]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickSuggestion = (suggest) => {
    setSelectedProduct(suggest);
    setSuggestions([]);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleClickFilter = (category) => {
    console.log(category);
    setSelectedCategory(category);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <NavDropdown
          title="Product Categories"
          id="offcanvasNavbarDropdown-expand-xl"
          className="mx-2 fs-5"
        >
          {categoriesLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : categoriesError ? (
            <Alert variant="danger">
              Error loading product for this categories
            </Alert>
          ) : (
            categories?.result.map((item) => (
              <div key={item._id}>
                <NavDropdown.Item
                  href="#action3"
                  className="d-flex justify-content-between"
                  onClick={() => handleClickFilter(item.title)}
                >
                  {item.title}
                  <IoIosArrowForward />
                </NavDropdown.Item>
              </div>
            ))
          )}
          <NavDropdown.Item href="/">All</NavDropdown.Item>
        </NavDropdown>
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
      </div>
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
          {currentProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          {currentProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default HomePage;
