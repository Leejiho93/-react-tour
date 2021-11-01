import express from "express";
// import cors from "cors";
const cors = require("cors");

import { sequelize } from "./models";
import userAPIRouter from "./routes/user";

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((e: Error) => {
    console.error(e);
  });

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("백엔드 작동중");
});

app.use("/api/user", userAPIRouter);

app.listen(8081, () => {
  console.log("server is running");
});
// const db = require("./models");

// const app = express();

// const PORT = process.env.PORT || 8081;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // db.sequelize.sync();

// app.get("/", (req, res) => {
//   res.send(`server is running on !${PORT}`);
// });

// app.listen(PORT, () => {
//   console.log(`server is running on ${PORT}`);
// });
