import React, { useState, useEffect } from "react";
import apiURL from "../api";
import { Box } from "@mui/material";
import ItemCard from "../components/ItemCard";
import Cart from "../components/Cart";

const Items = ({ isCartShown, setIsCartShown, cartItems, setCartItems }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log("Error fetching items", error));
  }, []);

  return (
    <Box className="items-page">
      {/* Greyed-out background when cart is shown */}
      {isCartShown && <Box className="overlay" />}

      {/* Cart displayed on the right side */}
      {isCartShown && (
        <Box className="cart-container">
          <Cart
            setIsCartShown={setIsCartShown}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </Box>
      )}

      <Box className="items-container">
        {items.map((item) => (
          <ItemCard
            item={item}
            key={item.id}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Items;
