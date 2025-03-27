/* eslint no-undef: 0 */

let apiURL;
let redirectURL;

if (process.env.NODE_ENV === "development") {
  apiURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
  redirectURL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";
} else {
  apiURL = "/api";
  redirectURL = "https://inventoryapp-r8aa.onrender.com"
}

export default apiURL;
