const axios = require("axios");
//import axios from "axios";

type Config = {
  query_str?: string;
  includeSummary?: boolean;
};

export const fetchConfig = async () => {
  const headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const result = await axios.post("/config", undefined, headers);
  return result;
};
