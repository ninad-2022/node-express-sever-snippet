import express from "express";
import dotEnv from "dotenv";
import cors from "cors";
import os from "os";
import routes from "./src/routes/index.js";
import mysqldb from "./src/database/mysql/index.js";
import cluster from "cluster";
class App {
    constructor() {
        dotEnv.config();
        const { CLUSTER_MODE } = process.env;
        mysqldb.connect()
            .then(async mysql => {
                await mysql.sequelize.authenticate();
                !CLUSTER_MODE && console.log(`1. MYSQL-connection has been established successfully.`);
                return mysql;
            })
            .then(connection => {
                !CLUSTER_MODE && console.log(`2. Configuring express-server.`);
                return this.configureApp(connection);
            })
            .then((app) => {
                !CLUSTER_MODE && console.log(`3. Binding error-handlers.`);
                return this.configureHandlers(app);
            })
            .then((app) => {
                !CLUSTER_MODE && console.log(`4. Starting services.`);
                return this.startServer(app);
            })
            .catch((err) => {
                console.log(`BUXTER-API failed to initialize!`);
                console.error(`error:`, err);
            });
    }

    configureApp = async (mysql) => {
        global.mysql = mysql;
        const app = express();
        app.use(express.json({ limit: "10mb" }));
        app.use(express.urlencoded({ extended: false }));
        app.use(cors());
        const { API_PREFIX } = process.env;
        app.use(`/${API_PREFIX}`, routes);
        return app;
    };

    startServer(server) {
        const { CLUSTER_MODE } = process.env;

        if (CLUSTER_MODE == `true ` && cluster.isPrimary) {
            return this.startMasterCluster();
        } else {
            return this.startWorkerServer(server);
        }
    }

    startMasterCluster() {
        const numCPUs = os.cpus().length;
        console.log(`Master ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
        });
    }

    startWorkerServer(server) {
        const { PORT } = process.env;
        server.listen(PORT, () => {
            console.log(`Worker ${process.pid} is running on [ http://localhost:${PORT} / ]`);
        });
    }

    configureHandlers(app) {
        return new Promise((resolve, _) => {
            // handled 404 
            app.use((req, res) => {
                return res.status(404).json({
                    error: `Not found: ${req.url}`,
                });
            });
            // handled 500
            app.use((err, req, res, next) => {
                console.log('err: ', err);
                const error = err.message || "Internal Server error!";
                res.status(500).json({
                    error,
                });
            });

            resolve(app);
        });
    }
}

export default new App();
