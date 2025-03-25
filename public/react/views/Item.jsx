import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiURL from "../api"
function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});

  async function fetchItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`);
      const data = await response.json();
      setItem(data);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="single-view">
      <div key={item.id} className="item">
        <h2>{item.name}</h2>
        <p>Description: {item.description}</p>
        <p>Price: {item.price?.toFixed(2)}</p>
        <p>Category: {item.category}</p>
        <img src={item.image} />
      </div>
    </div>
  );
}

export default Item;
