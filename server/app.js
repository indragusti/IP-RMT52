const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MonsterController = require("./controllers/MonsterController");

app.get("/monster", MonsterController.getAllMonster);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
