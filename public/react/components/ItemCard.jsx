import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, cartItems, setCartItems, setSnackbarMessage, setSnackbarOpen }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/items/${item.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCartItems([
      ...cartItems,
      item
    ])
    setSnackbarMessage("An error occurred. Please try again later.");
    setSnackbarOpen(true);
  };

  return (
    <Box
      className="item-card"
      onClick={handleItemClick}
      sx={{
        width: "320px", // Increased width
        height: "420px", // Increased height
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {item.image && (
        <Box
          component="img"
          className="item-card-image"
          alt={item.name}
          src={item.image}
          sx={{
            width: "100%",
            height: "60%", // Adjust height proportionally
            objectFit: "cover",
            padding: "16px",
            backgroundColor: "white",
          }}
        />
      )}
      <Box
        className="item-card-content"
        sx={{
          padding: "16px",
          backgroundColor: "#fff",
          height: "80%", // Adjust height proportionally
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          {item.name}
        </Typography>
        <Box
          className="price-category"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
            fontSize: "14px",
            color: "#555",
          }}
        >
          <Box
            component="span"
            sx={{ color: "rgb(25, 118, 210)", fontWeight: "bold" }}
          >
            Price: ${item.price}
          </Box>
          <Box component="span">Category: {item.category}</Box>
        </Box>
        <Box
          onClick={handleAddToCart}
          sx={{
            textAlign: "center",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          <Typography>Add to Cart</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCard;
