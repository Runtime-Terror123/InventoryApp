import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home.jsx";
import Item from "./views/Item.jsx";
import Items from "./views/Items.jsx";
import AddItem from "./views/AddItem.jsx";
import EditItem from "./views/EditItem";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Cart from "./components/Cart";
import { useAuth } from "react-oidc-context";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);
  const [cartItems, setCartItems] = useState([]);

    const auth = useAuth();

    const signOutRedirect = () => {
        const clientId = "7gqm3rvsa4noinqp0vcbrv19cq";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://<user pool domain>";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Encountering error... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                <pre> Hello: {auth.user?.profile.email} </pre>
                <pre> ID Token: {auth.user?.id_token} </pre>
                <pre> Access Token: {auth.user?.access_token} </pre>
                <pre> Refresh Token: {auth.user?.refresh_token} </pre>

                <button onClick={() => auth.removeUser()}>Sign out</button>
            </div>
        );
    }
  return (
    <BrowserRouter>
      <Header setIsCartShown={setIsCartShown} auth={auth} signOutRedirect={signOutRedirect} />
      {isCartShown && (
        <Box className="overlay" onClick={() => setIsCartShown(false)} />
      )}
      {isCartShown && (
        <Box className="cart-container">
          <Cart
            setIsCartShown={setIsCartShown}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        </Box>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items/:id" element={<Item />} />
        <Route
          path="/items"
          element={<Items cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/add" element={<AddItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
