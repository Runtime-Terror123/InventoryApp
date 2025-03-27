import {useEffect, useState} from "react";
import apiURL from "../api";
import {useParams} from "react-router-dom";
import React from 'react'
import {Button, TextField} from "@mui/material";

export default function EditItem() {
  const { id } = useParams();
  const [formState, setFormState] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    console.debug(formState);

    try {
      const response = await fetch(`${apiURL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();
      console.debug(JSON.stringify(data));

      if (response.ok) {
          setMessage("Item updated!");
      } else {
        if (data.errors === undefined) {
          setError(data);
        } else {
          // Server side validation errors
          setError({message: `${data.errors[0].msg} for ${data.errors[0].path}`});
        }

      }

    } catch (e) {
      console.error(e);
      setError({
        message: "There was a problem with the server.",
      });
    }
  }

  function onChange(event) {
    console.log(event.target)
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

  async function getItem() {
    const response = await fetch(`${apiURL}/items/${id}`)
    const data = await response.json();
    setFormState(data)
  }

  useEffect(() => {
    getItem()
  }, [])

  if (formState === null) {
    return "Loading...";
  }

  return (
    <div  style={{
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "5px",
    }}>
      <h1>Edit Item</h1>
      {error && <div
          style={{
            backgroundColor: "red",
            color: "white",
            marginBottom: "1vh",
            padding: "4px",
          }}
        >
          {error.message}
        </div>}
      {message && <div
        style={{
          backgroundColor: "lightgreen",
          color: "white",
          marginBottom: "1vh",
          padding: "4px",
        }}>
        {message}
      </div>}

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        <TextField id="outlined-basic" label="Name" name="name" variant="outlined" value={formState.name} onChange={onChange} required={true} />
        <TextField id="outlined-basic" label="Category" name="category" variant="outlined" value={formState.category} onChange={onChange} required={true} />
        <fieldset>
          <label htmlFor="image">Image</label>
          {formState.image && <div><img src={formState.image} alt={"Current image"} height={"300px"}/></div>}
          <input type={"file"} name={"image"} onChange={onChange} accept=".png,.jpg"/>
        </fieldset>
        <TextField type={"number"} id="outlined-basic" label="Price" name="price" value={formState.price} onChange={onChange} required={true}            min="0"
                   max="99999"
                   step={"0.01"}
                   required={true} />

        <TextField id="outlined-basic" label="Category" name="category" value={formState.category} onChange={onChange} required={true} />
        <Button variant="contained" type={"submit"}>
          Edit
        </Button>
      </form>
    </div>
  );
}
