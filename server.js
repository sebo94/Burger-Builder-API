const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const burgerIngredients = "burgerIngredients";
const orders = "orders";

app.listen(3001, () => {
  console.log("Connected to db and listening on port 3001");
});

app.get("/ingredients", (req, res) => {
  try {
    db.getFirst(burgerIngredients).then((ingredients) => res.send(ingredients));
  } catch (error) {
    console.error(error);
  }
});

app.get("/orders", (req, res) => {
  try {
    db.getCollection(orders).then((orders) => res.send(orders));
  } catch (error) {
    console.error(error);
  }
});

app.post("/orders", (req, res) => {
  try {
    const order = req.body;
    db.postOrder(orders, order).then(() =>
      res.send("Order placed successfully")
    );
  } catch (error) {
    console.error(error);
  }
});
