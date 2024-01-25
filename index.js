require("dotenv").config({ path: "./src/utils/.env" });
const express = require("express");
const { connectDB } = require("./src/config/db");
const consoleRouter = require("./src/api/routes/Console.router");
const videogameRouter = require("./src/api/routes/Videogame.router");
const userRouter = require("./src/api/routes/User.router");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.disable("x-powered-by");

app.use("/api/V1/", consoleRouter);
app.use("/api/V1/", videogameRouter);
app.use("/api/V1/", userRouter);

app.use("*", (req, res, next) => {
  return res.status(404).send("<h1> 404 Not found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server started in http://localhost:${PORT}`);
});
