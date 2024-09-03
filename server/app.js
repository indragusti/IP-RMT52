const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MonsterController = require("./controllers/MonsterController");
const UserController = require("./controllers/UserController");
const UserFavController = require("./controllers/UserFavController");

const authentication = require("./middlewares/authentication");
const { errorHandler } = require("./middlewares/errorHandlers");

app.post("/login", UserController.login);
// app.use(authentication)
app.get("/monster", MonsterController.getAllMonster);
app.get("/monster/:id", MonsterController.getPerMonster);
app.post("/users/:id/favorites");

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
