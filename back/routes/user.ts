import * as passport from "passport";
import * as express from "express";
import * as bcrypt from "bcrypt";
import User from "../models/user";

import { isLoggedIn } from "./middleware";

const router = express.Router();

// 내정보
router.get("/", isLoggedIn, (req, res) => {
  console.log("loaduser 실행");
  const user = req.user!.toJSON() as User;
  return res.json(user);
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
    const exNickname = await User.findOne({
      where: {
        nickname: req.body.nickname,
      },
    });
    if (exNickname) {
      return res.status(403).send("이미 사용중인 닉네임입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 11);
    const newUser = await User.create({
      userId: req.body.userId,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    const fullUser = await User.findOne({
      where: { id: req.body.userId },
      attributes: ["id", "nickname", "userId"],
    });
    return res.status(200).json(fullUser);
  } catch (e) {
    console.error("signup error", e);
    return next(e);
  }
});

// 로그인
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      console.log("login err: ", err);
      return next(err);
    }
    if (info) {
      console.error(info);
      console.log("info: ", info);
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
        return res.json(fullUser);
      } catch (e) {
        return next(e);
      }
    });
  })(req, res, next);
});

// 로그아웃
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
