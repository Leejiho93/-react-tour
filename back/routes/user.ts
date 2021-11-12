import * as passport from "passport";
import * as express from "express";
import * as bcrypt from "bcrypt";
import User from "../models/user";

import { isLoggedIn } from "./middleware";

const router = express.Router();

// 내정보
router.get("/", isLoggedIn, (req, res) => {
  console.log("api/user/ req", req.user);
  // req.user
  // const user = req.user!.toJSON() as User;
  // console.log("api/user/ user", user);
  // delete user.password;
  // const user = { id: 12, userId: "1", email: "1", nickname: "1" };
  // return res.json(req.user);
});

// 회원가입
router.post("/signup", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const newUser = await User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: hashedPassword,
      email: req.body.email,
    });
    // console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

// 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      console.error(info);
      return res.status(401).send(info.message);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: ["id", "nickname", "userId"],
        });
        // console.log("fullUser: ", fullUser);
        return res.json(fullUser);
      } catch (e) {
        return next(e);
      }
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  if (req.session) {
    req.session.destroy((err) => {
      res.send("logout! sesstion destroy");
    });
  } else {
    res.send("logout!");
  }
});

export default router;
