import { Sequelize } from "sequelize";
import config from "../config/config";

const prod = process.env.NODE_ENV === "production";
// const env =
//   (process.env.NODE_ENV as "production" | "test" | "development") ||
//   "development";
const env = prod ? "production" : "development";
const { database, username, password } = config[env];
const sequelize = new Sequelize(database, username, password, config[env]);

export { sequelize };
export default sequelize;
