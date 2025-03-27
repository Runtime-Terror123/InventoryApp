import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiURL from "../api";
function Item() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  async function fetchItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`);
      const data = await response.json();
      if (!response.ok) {
        return;
      }
      setItem(data);
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  async function deleteItem() {
    try {
      const response = await fetch(`${apiURL}/items/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.debug(data);
      navigate("/items");
    } catch (err) {
      console.error("Oh no an error! ", err);
    }
  }
  console.log(item);
  if (item === null) {
    return <div>No Item</div>;
  }
  return (
    <div className="single-view">
      <div key={item.id} className="item">
        <h2>{item.name}</h2>
        <p>Description: {item.description}</p>
        <p>Price: {item.price?.toFixed(2)}</p>
        <p>Category: {item.category}</p>
        {item.image && <img src={item.image} alt={`${item.description} image`} />}
        <button onClick={deleteItem}>Delete Item</button>
        <button onClick={() => navigate(`/edit/${id}`)}>Edit Item</button>
      </div>
    </div>
  );
}

export default Item;
