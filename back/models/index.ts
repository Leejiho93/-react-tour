import User, { associate as associateUser } from "./user";
import Comment, { associate as associateComment } from "./comment";

export * from "./sequelize";
const db = {
  User,
  Comment,
};

export type dbType = typeof db;

associateComment(db);
associateUser(db);
