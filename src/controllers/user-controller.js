const createHttpError= require("http-errors");
const userProvider= require("../providers/user-provider.js");
const { v4: isUuid } = require('uuid');


class UserController {

    getUser = (req, res, next) => {
        const { id } = req.params;

        if (id && !isUuid(id)) throw createHttpError(404, `${id} is invalid.`);
        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) {
                    throw createHttpError(404, `${id} does not exist.`);
                }
                return res.status(200).json({ data, message: `User fetch successfully!` })
            })
            .catch(next)
    };

    createUser = (req, res, next) => {
        const { body: payload } = req

        userProvider.getUser({ username: payload.username })
            .then(data => {
                if (data.length !== 0) {
                    throw createHttpError(403, `username already exist`);
                }
                return userProvider.createUser(payload)
            })
            .then(data => {
                return res.status(201).json({ data: data, message: `User created successfully!` })
            })
            .catch(next)
    };

    updateUser = (req, res, next) => {
        const { params: { id }, body: payload } = req

        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) {
                    throw createHttpError(404, `user does not exist!`);
                }
                return userProvider.updateUser(payload, id)
            })
            .then(() => {
                return userProvider.getUser({ id })
            })
            .then(data => {
                return res.status(200).json({ data: data, message: `User updated successfully!` })
            })
            .catch(next)
    };

    deleteUser = (req, res, next) => {
        const { id } = req.params;

        if (!isUuid(id)) throw createHttpError(404, `${id} is invalid uuid.`);
        return userProvider.getUser({ id })
            .then(data => {
                if (data.length === 0) {
                    throw createHttpError(404, `user does not exist!`);
                }
                return userProvider.deleteUser(id)
            })
            .then(() => {
                return res.status(204).json({ data: null, message: `user deleted succcessfully!` });
            })
            .catch(next)
    };
}

module.exports = new UserController();