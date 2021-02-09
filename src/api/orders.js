import axios from "axios";

const baseAPIURL = "https://my-json-server.typicode.com/HariKrishna-9885699666/React-Mock-JSON-Data-Using-JSON-Server/orders";

// Get all order
export const getMyOrder = async () => {
  const result = await axios.get(baseAPIURL);
  return result.data;
};

// Get order details by id
export const getOrder = async (id) => {
  const result = await axios.get(baseAPIURL + "/" + id);
  return result.data;
};
