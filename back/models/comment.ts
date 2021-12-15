import { DataTypes, HasManyAddAssociationMixin, Model } from "sequelize";
import { sequelize } from "./sequelize";
import { dbType } from "./index";
import User from "./user";
class Comment extends Model {
  public id!: number;
  public contentId!: number;
  public content!: string;
  //   public addComment!: HasManyAddAssociationMixin<Comment, number>;
  public readonly User?: User;
  //   public readonly Comments?: Comment[];
}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comment",
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db: dbType) => {
  db.Comment.belongsTo(db.User);
};

export default Comment;
