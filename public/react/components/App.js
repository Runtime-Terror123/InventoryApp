import React, { useEffect, useState } from "react";

// Prepend the API URL to any fetch calls.
import apiURL from "../api";
import AddItem from "./AddItem";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch the items
  }, []);

  return (
    <>
      <h1>Inventory App</h1>
      <AddItem/>
    </>
  );
}

export default App;
