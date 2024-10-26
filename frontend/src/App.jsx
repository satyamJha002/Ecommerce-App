import React from "react";
import { Container } from "react-bootstrap";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
