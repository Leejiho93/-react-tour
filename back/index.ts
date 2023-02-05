import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import * as expressSession from "express-session";

import passportConfig from "./passport";
import { sequelize } from "./models";
import userAPIRouter from "./routes/user";
import detailAPIRouter from "./routes/detail";
import commentAPIRouter from "./routes/comment";
import * as hpp from "hpp";
import * as helmet from "helmet";
import * as morgan from "morgan";

const prod = process.env.NODE_ENV === "production";

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((e: Error) => {
    console.error(e);
  });

const corsDevOptions = {
  origin: true,
  credentials: true,
};
const corsProdOptions = {
  origin: /nicetravel\.kr$/,
  credentials: true,
};
passportConfig();

if (prod) {
  app.use(hpp());
  app.use(helmet());
  app.use(morgan("combined"));
  app.use(cors(corsProdOptions));
} else {
  app.use(morgan("dev"));
  app.use(cors(corsDevOptions));
}

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
      maxAge: 1000 * 60 * 60,
      domain: prod ? ".nicetravel.kr" : undefined,
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
app.use("/api/comment", commentAPIRouter);
app.use("/api/detail", detailAPIRouter);

app.listen(prod ? process.env.PORT : 8081, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
