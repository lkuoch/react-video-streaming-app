//# Endpoint for stream api

import axios from "axios";

//* Connection info
export default axios.create({
  baseURL: "http://localhost:3001"
});
