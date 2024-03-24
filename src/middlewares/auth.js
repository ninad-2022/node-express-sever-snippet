import createHttpError from "http-errors";
import { verifyToken } from "../helpers/jwt-token.js";

class Authorization {
    auth = () => {
        return (req, res, next) => {
            if (!req.headers.authorization) {
                return next(createHttpError(401));
            };
            try {
                const verifiedData = verifyToken(req.headers.authorization);
                if (verifiedData) {
                    req.jwtData = verifiedData;
                    return next();
                }
                return createHttpError(403)
            } catch (error) {
                next(createHttpError(403, error.message));
            };
        };
    };
};
export default new Authorization();