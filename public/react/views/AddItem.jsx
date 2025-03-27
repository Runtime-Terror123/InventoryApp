import { useState } from "react";
import apiURL from "../api";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Typography } from "@mui/material";

export default function AddItem() {
  const defaultFormState = {
    name: "",
    description: "",
    category: "",
    image: "",
    price: 1,
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.debug(formState);

    try {
      const response = await fetch(`${apiURL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      console.debug(JSON.stringify(data));

      if (response.ok) {
        setFormState(defaultFormState);
        navigate("/items");
      } else {
        if (data.errors === undefined) {
          setError(data);
        } else {
          // Server side validation errors
          setError({message: `${data.errors[0].msg} for ${data.errors[0].path}`});
        }

      }
    } catch (e) {
      console.error(e);
      setError({
        message: "There was a problem with the server.",
      });
    }
  }

  function onChange(event) {
    // For the image, we have to use FileReader, set the onloadend callback function and call readAsDataURL
    if (event.target.name === "image") {
      let reader = new FileReader();
      reader.onloadend = (event) => {
        const content = event.target.result;
        setFormState({ ...formState, image: content });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFormState({ ...formState, [event.target.name]: event.target.value });
    }
  }

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add Item
      </Typography>
      {error && (
        <Box
          sx={{
            backgroundColor: "red",
            color: "white",
            marginBottom: "16px",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {error.message}
        </Box>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" component="label" htmlFor="name">
            Name
          </Typography>
          <input
            name="name"
            value={formState.name}
            onChange={onChange}
            minLength="2"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" component="label" htmlFor="description">
            Description
          </Typography>
          <input
            name="description"
            value={formState.description}
            onChange={onChange}
            minLength="2"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" component="label" htmlFor="category">
            Category
          </Typography>
          <input
            name="category"
            value={formState.category}
            onChange={onChange}
            minLength="2"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" component="label" htmlFor="image">
            Image
          </Typography>
          <input
            type="file"
            name="image"
            onChange={onChange}
            accept=".png,.jpg"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Typography variant="body1" component="label" htmlFor="price">
            Price
          </Typography>
          <input
            name="price"
            value={formState.price}
            onChange={onChange}
            type="number"
            min="0"
            max="99999"
            step="0.01"
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "4px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "lightgreen",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add
          </button>
        </Box>
      </form>
    </Box>
  );
}
