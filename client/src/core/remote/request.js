import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const sendRequest = async (method, route, body, headers) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response;
};
