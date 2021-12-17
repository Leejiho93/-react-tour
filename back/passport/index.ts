import * as passport from "passport";
import User from "../models/user";
import local from "./local";

export default () => {
  passport.serializeUser((user: any, done) => done(null, user.id));

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "nickname", "userId"],
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
