import createHttpError from "http-errors";
import { verifyToken } from "../helpers/jwt-token.js";

class Authorization {
    verify = () => {
        return (req, res, next) => {
            const { authorization } = req.headers;
            if (!authorization) {
                return next(createHttpError(401));
            };
            try {
                const token = authorization.slice(7)
                const verifiedData = verifyToken(token);
                if (verifiedData) return next();
                return createHttpError(403)
            } catch (error) {
                next(createHttpError(403, error.message));
            };
        };
    };
};
export default new Authorization();