import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "regenerator-runtime/runtime";
import App from "./App";
import {AuthProvider} from "react-oidc-context";

const container = document.getElementById("root");
const root = createRoot(container);

const cognitoAuthConfig = {
    authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_UUucYZe5a",
    client_id: "7gqm3rvsa4noinqp0vcbrv19cq",
    redirect_uri: "https://inventoryapp-r8aa.onrender.com/",
    response_type: "code",
    scope: "phone openid email",
};

root.render(
  <StrictMode>
      <AuthProvider {...cognitoAuthConfig}>
    <App />
      </AuthProvider>
  </StrictMode>
);
