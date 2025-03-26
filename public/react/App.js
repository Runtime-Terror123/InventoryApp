import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";
import AddItem from "./views/AddItem.jsx";
import EditItem from "./views/EditItem";
import Header from "./components/Header";
import { set } from "lodash";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  return (
    <BrowserRouter>
      <Header setIsCartShown={setIsCartShown} />
      <Routes>
        <Route path="/items/:id" element={<Item />} />
        <Route
          path="/items"
          element={
            <Items
              isCartShown={isCartShown}
              setIsCartShown={setIsCartShown}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
