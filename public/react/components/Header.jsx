import { NavLink } from "react-router-dom";
import React from "react";
import {Canvas} from "@react-three/fiber";
import Logo from "./Logo";
export default function Header() {
  return (
    <header
      id={"header"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "1vh",
        marginBottom: "1vh"
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
      }}>
          <div id="canvas-container" style={{ display: "inline-block", height: "10vh" }} >
            <Canvas>
              <Logo/>
            </Canvas>
        </div>
        <h1 style={{ display: "inline-block" }} >Inventory App</h1>
      </div>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <NavLink to="/" end>
          <h2>Home</h2>
        </NavLink>
        <NavLink to="/add" end>
          <h2>Add</h2>
        </NavLink>
        <NavLink to="/items" end>
          <h2>Items</h2>
        </NavLink>
      </nav>
    </header>
  );
}