import createHttpError from "http-errors";
import userProvider from "../providers/userProvider.js";
import { v4 as isUuid } from 'uuid';
import { generateToken } from "../helpers/jwt-token.js";
class UserController {

    getUser = (req, res, next) => {
        const { id } = req.params;

        if (id && !isUuid(id)) throw createHttpError(404, `${id} is invalid.`);
        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) throw createHttpError(404, `${id} does not exist.`);
                return res.status(200).json({ data, message: `User fetch successfully!` })
            })
            .catch(next);
    };

    createUser = (req, res, next) => {
        const { body: payload } = req

        return userProvider.getUser({ username: payload.username })
            .then(data => {
                if (data.length !== 0) throw createHttpError(403, `username already exist`);
                return userProvider.createUser(payload)
            })
            .then(data => {
                const token = generateToken({ id: data.id, username: data.username });
                return res.status(201).json({ data: { id: data.id, username: data.username, token }, message: `User created successfully!` })
            })
            .catch(next);
    };

    updateUser = (req, res, next) => {
        const { params: { id }, body: payload } = req

        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) throw createHttpError(404, `user does not exist!`);
                return userProvider.updateUser(payload, id)
            })
            .then(() => {
                return userProvider.getUser({ id })
            })
            .then(data => {
                return res.status(200).json({ data: data, message: `User updated successfully!` })
            })
            .catch(next);
    };

    deleteUser = (req, res, next) => {
        const { id } = req.params;

        if (!isUuid(id)) throw createHttpError(404, `${id} is invalid uuid.`);
        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) throw createHttpError(404, `user does not exist!`);
                return userProvider.deleteUser(id)
            })
            .then(() => {
                return res.status(204).json({ data: null, message: `user deleted succcessfully!` });
            })
            .catch(next);
    };
}

export default new UserController();