import React, { useState } from "react";
import apiURL from "../api";
import { Box, Typography, Snackbar, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ setIsCartShown, cartItems, setCartItems, auth }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const toggleCart = () => {
    setIsCartShown((prev) => !prev);
  };

  const handleDeleteCartItem = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${apiURL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth.user.id_token,
        },
        body: JSON.stringify({ items: cartItems }),
      });

      if (response.ok) {
        setCartItems([]);
        setSnackbarMessage("Order placed successfully!");
        setSnackbarOpen(true);
        setTimeout(() => {
          setIsCartShown(false);
        }, 6000);
      } else {
        setSnackbarMessage("Failed to place order. Please try again.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setSnackbarMessage("An error occurred. Please try again later.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box className="cart">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Your Cart</Typography>
        <Typography
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={toggleCart}
        >
          Hide Cart
        </Typography>
      </Box>
      {cartItems.length === 0 ? (
        <Typography>No items in your cart</Typography>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box>
                <Typography>{item.name}</Typography>
                <Typography>${item.price}</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleDeleteCartItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Box>
            <Typography
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Typography>
          </Box>
        </>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>
        }
      />
    </Box>
  );
};

export default Cart;
