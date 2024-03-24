import Sequelize from "sequelize";
import dotEnv from "dotenv";
import mysql2 from "mysql2";
import UserModel from "./models/user.js";

class DbConn {
    constructor() {
        dotEnv.config();
    };

    connect = async () => {
        const { HOST, USER, PASSWORD, DATABASE, DIALECT } = process.env;
        const conf = { host: HOST, dialect: DIALECT, logging: false, dialectModule: mysql2 };
        let retryCount = 0;
        const attemptConnection = async () => {
            try {
                const sequelize = await new Sequelize(DATABASE, USER, PASSWORD, conf);
                const db = {
                    models: {
                        user: UserModel(sequelize),
                    },
                };
                db.sequelize = sequelize;
                return db;
            } catch (error) {
                if (retryCount < 3) {
                    console.error(`Failed to connect to the db, Retrying...`);
                    retryCount++
                    return attemptConnection();;
                } else {
                    throw error;
                }
            }
        };
        return attemptConnection();
    };
}
export default new DbConn;