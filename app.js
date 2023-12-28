import express from 'express';
import dotEnv from "dotenv";
import cors from "cors";
import routes from "./src/routes/index.js"
class App {
    constructor() {
        dotEnv.config();
        this.configureApp()
            .then(app => {
				console.log("2. Binding error-handlers.");
                return this.configureHandlers(app)
            })
            .then(app => {
				console.log("3. Configuring express-server.");
                return this.startServer(app)
            })
            .catch(err => {
                console.log("Error initializing the app", err);
            })
    }

    configureApp = async () => {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        const { API_PREFIX } = process.env;
        app.use(`/${API_PREFIX}`, routes);
        return app;
    };

    startServer(server) {
        return new Promise((resolve, _) => {
            const { PORT } = process.env;
            server.listen(PORT, () => {
                console.log(`Server is running on [ http://localhost:${PORT}/ ]`);
            });
            resolve(server);
        })
    }

    configureHandlers(app) {
        return new Promise((resolve, _) => {
            app.use((req, res, next) => {
                return res.status(404).send({
                    error: `Not found: ${req.url}`,
                });
            });
            resolve(app);
        });
    }
}

export default new App();
