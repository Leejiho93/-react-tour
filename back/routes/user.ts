import { AxiosError } from "axios";
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

const router = express.Router();

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
    console.log(newUser);
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
