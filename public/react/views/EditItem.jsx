import {useEffect, useState} from "react";
import apiURL from "../api";
import {useParams} from "react-router-dom";

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
    <>
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
          {formState.image && <div><img src={formState.image} alt={"Current image"} height={"300px"}/></div>}
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
