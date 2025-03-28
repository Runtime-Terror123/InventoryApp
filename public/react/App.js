import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";
import AddItem from "./views/AddItem.jsx";
import EditItem from "./views/EditItem";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Orders from "./views/Orders";
import Order from "./views/Order";
import { useAuth } from "react-oidc-context";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    console.error(auth.error.message);
  }

  if (auth.isAuthenticated) {
    console.debug(auth.user);
  }

  return (
    <BrowserRouter>
      <Header
        setIsCartShown={setIsCartShown}
        auth={auth}
        isAuthenticated={auth.isAuthenticated}
      />
      {isCartShown && (
        <Box className="overlay" onClick={() => setIsCartShown(false)} />
      )}
      {isCartShown && (
        <Box className="cart-container">
          <Cart
            setIsCartShown={setIsCartShown}
            cartItems={cartItems}
            setCartItems={setCartItems}
            auth={auth}
            snackbarOpen={snackbarOpen}
            setSnackbarOpen={setSnackbarOpen}
            snackbarMessage={snackbarMessage}
            setSnackbarMessage={setSnackbarMessage}
          />
        </Box>
      )}
      <Box sx={{ minHeight: "100vh", paddingTop: "10vh" }} >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/:id" element={<Item />} />
          <Route
            path="/items"
            element={
              <Items
                cartItems={cartItems}
                setCartItems={setCartItems}
                setIsCartShown={setIsCartShown}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
              />
            }
          />

          <Route path="/orders/:id" element={<Order />} />
          <Route path="/orders" element={<Orders auth={auth} />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
