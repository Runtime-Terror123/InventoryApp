import { NavLink } from "react-router-dom";
import React from "react";
import {Canvas} from "@react-three/fiber";

export default function Header() {
  return (
    <header
      id={"header"}
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div id="canvas-container">
          <Canvas>
            <mesh>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
          <h1>Inventory App</h1>
        </div>
      </div>
      <nav>
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