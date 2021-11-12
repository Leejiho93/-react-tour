import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";

import passportConfig from "./passport";
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
passportConfig();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "dqpsa",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("백엔드 작동중");
});

app.use("/api/user", userAPIRouter);

app.listen(8081, () => {
  console.log("server is running");
});
