import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";

// Prepend the API URL to any fetch calls.
import apiURL from "./api.js";
import AddItem from "./views/AddItem.jsx";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
