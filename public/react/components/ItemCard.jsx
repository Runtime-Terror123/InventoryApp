import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, cartItems, setCartItems }) => {
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
  };

  return (
    <Box key={item.id} className="item-card" onClick={handleItemClick}>
      {item.image && <img
        className="item-card-image"
        alt={item.name}
        src={item.image}
      />}
      <Box className="item-card-content">
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Box className="price-category">
          <Box component="span">Price: ${item.price}</Box>
          <Box component="span">Category: {item.category}</Box>
        </Box>
        <Box onClick={handleAddToCart}>
          <Typography>Add to Cart</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemCard;
