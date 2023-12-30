import Sequelize from "sequelize";
import dotEnv from "dotenv";
import UserModel from "./models/user.js";

class DbConn {
    constructor() {
        dotEnv.config();
    };

    connect = async () => {
        const { HOST, USER, PASSWORD, DATABASE, DIALECT } = process.env;
        const conf = {
            host: HOST,
            dialect: DIALECT,
            logging: false,
        }
        const sequelize = await new Sequelize(DATABASE, USER, PASSWORD, conf);
        const db = {
            models: {
                user: UserModel(sequelize)
            }
        }

        db.sequelize = sequelize;
        return db;
    }
}
export default new DbConn();
