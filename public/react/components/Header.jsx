import { NavLink } from "react-router-dom";
import React from "react";

export default function Header() {
  return (
    <header
      id={"header"}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h1>Inventory App</h1>
      <nav>
        <NavLink to="/" end>
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/add" end>
          <h2>Add</h2>
        </NavLink>
      </nav>
    </header>
  );
}
