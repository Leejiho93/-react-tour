import * as passport from "passport";
import * as bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import User from "../models/user";

export default () => {
  passport.use(
    "local",
    new Strategy(
      {
        usernameField: "userId",
        passwordField: "password",
      },
      async (userId, password, done) => {
        try {
          const user = await User.findOne({ where: { userId } });
          if (!user) {
            return done(null, false, {
              message: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.",
            });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
            //seriakuzeUser에 user정보 넘겨줌
          }
          return done(null, false, {
            message: "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.",
          });
        } catch (e) {
          console.error(e);
          console.log("local err ", e);
          return done(e);
        }
      }
    )
  );
};
