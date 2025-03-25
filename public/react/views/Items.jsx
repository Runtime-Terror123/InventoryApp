import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const Items = () => {
  const [items, setItems]= useState();

  useEffect(() => {
    fetch ("https:/http://localhost:3000/api/items")
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
        <span>Price: ${item.price}</span>
        <span>Category: {item.category}</span>
      </div>
    ))}
  </div>
);
};


export default Items
