import React, { useEffect, useState } from "react";
import SingleView from "./SingleView.jsx";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <>
      <h1>Inventory App</h1>
      {/* Render the items */}
      <SingleView items={items}/>
    </>
  );
}

export default App;
