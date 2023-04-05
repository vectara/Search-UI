const express = require("express");
require("dotenv").config();
const app = express();
const port = 3000;

app.use("/", express.static("build"));

app.get("/", function (req, res) {
  res.render("build/index.html");
});

app.post("/config", (req, res) => {
  const {
    REACT_APP_endpoint,
    REACT_APP_corpus_id,
    REACT_APP_customer_id,
    REACT_APP_auth_api_key,
    REACT_APP_search_title_pre,
    REACT_APP_search_title_inner,
    REACT_APP_search_title_post,
    REACT_APP_search_title_url,
    REACT_APP_Q1,
    REACT_APP_Q2,
    REACT_APP_Q3,
    REACT_APP_Q4,
  } = process.env;

  res.send({
    REACT_APP_endpoint,
    REACT_APP_corpus_id,
    REACT_APP_customer_id,
    REACT_APP_auth_api_key,
    REACT_APP_search_title_pre,
    REACT_APP_search_title_inner,
    REACT_APP_search_title_post,
    REACT_APP_search_title_url,
    REACT_APP_Q1,
    REACT_APP_Q2,
    REACT_APP_Q3,
    REACT_APP_Q4,
  });
});

app.listen(port, () => {});
