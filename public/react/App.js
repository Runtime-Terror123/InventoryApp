import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";
import AddItem from "./views/AddItem.jsx";
import EditItem from "./views/EditItem";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Orders from "./views/Orders";
import Order from "./views/Order";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <Header setIsCartShown={setIsCartShown} />
      {isCartShown && (
        <Box className="overlay" onClick={() => setIsCartShown(false)} />
      )}
      {isCartShown && (
        <Box className="cart-container">
          <Cart
            setIsCartShown={setIsCartShown}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<Item />} />
        <Route
          path="/items"
          element={<Items cartItems={cartItems} setCartItems={setCartItems} />}
        />

        <Route path="/orders/:id" element={<Order />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
