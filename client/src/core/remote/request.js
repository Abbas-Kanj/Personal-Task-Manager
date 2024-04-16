import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000/";
const jwt = localStorage.getItem("token");

export const sendRequest = async (method, route, body) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response;
};
