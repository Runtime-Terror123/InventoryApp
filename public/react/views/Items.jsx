import React, { useState, useEffect } from "react";
import apiURL from "../api";
import { Box } from "@mui/material";
import ItemCard from "../components/ItemCard";

const Items = ({ cartItems, setCartItems, setIsCartShown, setSnackbarOpen, setSnackbarMessage }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`${apiURL}/items`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log("Error fetching items", error));
  }, []);

  return (
      <Box className="items-page">
          <h1>Items</h1>
          <Box className="items-container">
              {items.map((item) => (
                  <ItemCard
                      item={item}
                      key={item.id}
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      setIsCartShown={setIsCartShown}
                      setSnackbarOpen={setSnackbarOpen}
                      setSnackbarMessage={setSnackbarMessage}

                  />
              ))}
          </Box>
      </Box>
  );
};

export default Items;
