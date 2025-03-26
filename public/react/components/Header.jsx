import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header({ setIsCartShown }) {
  const toggleCart = () => {
    setIsCartShown((prev) => !prev);
  };
  return (
    <header
      id={"header"}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1>Inventory App</h1>
      <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <NavLink to="/" end>
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/add" end>
          <h2>Add</h2>
        </NavLink>
        <NavLink to="/items" end>
          <h2>Items</h2>
        </NavLink>
        <IconButton onClick={toggleCart}>
          <ShoppingCartIcon />
        </IconButton>
      </nav>
    </header>
  );
}
