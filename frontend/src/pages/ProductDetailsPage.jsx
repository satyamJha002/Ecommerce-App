import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from "react-bootstrap";
import Rating from "../component/Rating";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const { data, error, loading } = useFetch(
    `http://localhost:3000/api/v1/products/${id}`
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error..{error}</div>;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row>
        <Col md={5}>
          <Image
            src={data?.images[1]}
            fluid
            style={{
              width: "100%",
              height: "450px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{data?.title}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={data?.rating} />
            </ListGroup.Item>
            <ListGroup.Item>Price: Rs. {data?.price}</ListGroup.Item>
            <ListGroup.Item>
              Specification:
              {data?.specs.map((item, index) => (
                <ListGroup.Item key={index}>{item}</ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>Rs. {data?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {data?.inStock > 0 ? "In Stock" : "Out Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={data?.inStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsPage;