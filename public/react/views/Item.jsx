import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
import { Box, Typography } from "@mui/material";

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  async function fetchItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      setItem(data);
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  async function deleteItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.debug(data);
      navigate("/items");
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  }
  console.log(item);
  if (item === null) {
    return <div>No Item</div>;
  }
  return (
    <Box
      className="single-view"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,

        maxWidth: 800,
        margin: "auto",
      }}
    >
      <Box
        key={item.id}
        className="item"
        sx={{
          textAlign: "center",
          padding: 3,
          backgroundColor: "#ffffff",
          borderRadius: 2,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          {item.name}
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Description: {item.description}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Price: ${item.price?.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Category: {item.category}
        </Typography>
        {item.image && (
          <Box
            component="img"
            src={item.image}
            alt={`${item.description} image`}
            sx={{
              width: "100%",
              maxWidth: 600,
              height: "auto",
              objectFit: "cover",
              borderRadius: 2,
              marginTop: 2,
            }}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <button
            onClick={deleteItem}
            style={{
              padding: "8px 16px",
              backgroundColor: "#d32f2f",
              color: "#ffffff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Delete Item
          </button>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              color: "#ffffff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Edit Item
          </button>
        </Box>
      </Box>
    </Box>
  );
}

export default Item;
