import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />

            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
