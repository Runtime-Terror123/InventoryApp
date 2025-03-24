import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SingleView from "./SingleView.jsx";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";
import Home from "../views/Home.jsx";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    // <>
    //   {/* Render the items */}
    //   <SingleView items={items}/>
    // </>


  );
}

export default App;
