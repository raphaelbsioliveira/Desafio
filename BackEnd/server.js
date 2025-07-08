const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;

app.use(cors());
const products = require("./mock-products.json");
app.get("/products", (req, res) => {
  res.json(products.products);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
