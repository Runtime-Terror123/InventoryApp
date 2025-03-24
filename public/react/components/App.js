import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SingleView from "./SingleView.jsx";

import Home from "../views/Home.jsx";
import AddItem from "../views/AddItem";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<AddItem/>}/>
      </Routes>
    </BrowserRouter>
    // <>
    //   {/* Render the items */}
    //   <SingleView items={items}/>
    // </>

  );
}

export default App;
