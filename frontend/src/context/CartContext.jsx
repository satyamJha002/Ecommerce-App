import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const [error, setError] = useState(null);

  const { token } = useContext(UserContext);

  const fetchCartItems = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.cart.items);
      setTotal(response.data.cart.total);
      setItemCount(
        response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to fetch cart items", error);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (userId, productId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/cart/${userId}`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.cart.items);
      setTotal(response.data.cart.total);
      setItemCount(
        response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to add items in cart", error);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromCart = async (userId, itemId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cart/${userId}/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.cart.items);
      console.log(response.data.cart.total);
      setCart(response.data.cart.items);
      setTotal(response.data.cart.total);
      setItemCount(
        response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0)
      );
    } catch (error) {
      console.log(error);
      setError("Failed to remove item from cart", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loading,
        itemCount,
        error,
        fetchCartItems,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
