import { DataTypes, Model } from "sequelize";
import Comment from "./comment";
import { dbType } from "./index";
import { sequelize } from "./sequelize";

class User extends Model {
  public id!: number;
  public userId!: string;
  public nickname!: string;
  public password!: string;
  public readonly Comments?: Comment[];
}

User.init(
  {
    userId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "user",
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.User.hasMany(db.Comment);
};

export default User;
