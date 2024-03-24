import createHttpError from "http-errors";
import userProvider from "../providers/user-provider.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt-token.js";

class AuthController {

    login = (req, res, next) => {
        const { body: payload } = req
        return userProvider.getUser({ username: payload.username })
            .then(async data => {
                if (data.length === 0) throw createHttpError(403, `user does not exist`);
                const verifyPassword = await bcrypt.compare(payload.password, data[0].password);
                if (verifyPassword) {
                    const token = generateToken({ id: data[0].id, username: data[0].username });
                    return res.status(201).json({ data: { id: data[0].id, username: data[0].username, token }, message: `login successfull` })
                };
                throw createHttpError(401, `Unauthorized`);
            })
            .catch(next);
    };
}

export default new AuthController();