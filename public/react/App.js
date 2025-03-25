import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";

import AddItem from "./views/AddItem.jsx";
import Header from "./components/Header";
import EditItem from "./views/EditItem";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<Item />} />
        <Route path="/items" element={<Items />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
