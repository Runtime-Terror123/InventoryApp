import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import apiURL from "../api";

const Items = () => {
  const [items, setItems]= useState([]);

  useEffect(() => {
    fetch (`${apiURL}/items`)
    .then(response => response.json())
    .then(data => setItems(data))
    .catch(error => console.log('Error fetching items', error));
  },
[])
  return (
    <div className= "items-container">
     {items.map(item => (
        <div className="item" key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
          <img  src={item.image} alt="" height={"300px"}/>
        <span>Price: ${item.price}</span>
        <span>Category: {item.category}</span>
        <NavLink to={`/items/${item.id}`}>
        <h2>More Details</h2>
      </NavLink>
      </div>
    ))}
  </div>
);
};

export default Items;
