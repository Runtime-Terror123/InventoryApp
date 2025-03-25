import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const apiURL = "http://localhost:3000/api";

  async function fetchItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`);
      const data = await response.json();
      console.log(data)
      console.log(data.id)
      console.log(data.name)
      setItem(data);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }


  useEffect(() => {
    // Fetch the item
    fetchItem();
  }, []);

  return (
    <div className="single-view">
      <div key={item.id} className="item">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <p>{item.price}</p>
        <p>{item.category}</p>
        <img src={item.image} alt="Blue Backpack" />
      </div>
    </div>
  );
}

export default Item;
