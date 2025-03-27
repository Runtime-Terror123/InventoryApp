import { useState } from "react";
import apiURL from "../api";
import { useNavigate } from "react-router-dom";
import React from 'react'

export default function AddItem() {
  const defaultFormState = {
    name: "",
    description: "",
    category: "",
    image: "",
    price: 1,
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.debug(formState);

    try {
      const response = await fetch(`${apiURL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      console.debug(JSON.stringify(data));

      if (response.ok) {
        setFormState(defaultFormState);
        navigate("/");
      } else {
        setError(data);
      }

    } catch (e) {
      console.error(e);
      setError({
        message: "There was a problem with the server.",
      });
    }
  }

  function onChange(event) {
    // For the image, we have to use FileReader, set the onloadend callback function and call readAsDataURL
    if (event.target.name === "image") {
      let reader = new FileReader();
      reader.onloadend = (event) => {
        const content = event.target.result;
        setFormState({...formState, image: content});
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFormState({...formState, [event.target.name]: event.target.value});
    }
  }

  return (
    <>
      <h1>Add Item</h1>
      {error && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            marginBottom: "1vh",
            padding: "4px",
          }}
        >
          {error.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input name={"name"} value={formState.name} onChange={onChange} />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input
            name={"description"}
            value={formState.description}
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="category">Category</label>
          <input
            name={"category"}
            value={formState.category}
            onChange={onChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="image">Image</label>
          <input type={"file"} name={"image"} onChange={onChange} accept=".png,.jpg"/>
        </fieldset>
        <fieldset>
          <label htmlFor="price">Price</label>
          <input
            name={"price"}
            value={formState.price}
            onChange={onChange}
            type={"number"}
            min="0"
            max="99999"
            step={"0.01"}
          />
        </fieldset>
        <fieldset>
          <button
            type={"submit"}
            style={{
              backgroundColor: "lightgreen",
            }}
          >
            Add
          </button>
        </fieldset>
      </form>
    </>
  );
}
