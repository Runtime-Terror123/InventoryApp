import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Canvas} from "@react-three/fiber";
import Logo from "./Logo";
import { ResizeObserver } from '@juggle/resize-observer';

export default function Header({ setIsCartShown, auth, signOutRedirect, isAuthenticated }) {
  const toggleCart = () => {
    setIsCartShown((prev) => !prev);
  };

  return <header
      id={"header"}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: "1vh",
        marginBottom: "1vh",
      }}
    >
      <nav style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
      }}>
          <div id="canvas-container" style={{ display: "inline-block", height: "10vh", width: '7vw' }} >
            <Canvas resize={{ polyfill: ResizeObserver}}>
              <Logo/>
            </Canvas>
        </div>

        <h1 style={{ display: "inline-block" }} >Inventory App</h1>
      </div>
        <nav style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/add" end>
            Add
          </NavLink>
          <NavLink to="/items" end>
            Items
          </NavLink>
          <div>
            <IconButton onClick={toggleCart}>
              <ShoppingCartIcon/>
            </IconButton>
          </div>
          {isAuthenticated ?
              <div style={{
                display: "flex",
                flexDirection: "column",
              }}>
                {auth.user.profile.email}
                <a href="#" onClick={() => auth.removeUser()}>Sign out</a>
              </div>
              :
              <a href="#" onClick={() => auth.signinRedirect()}>Sign in</a>
          }
          </nav>
      </nav>
  </header>
}