import { v4 as uuid } from 'uuid';
import bcrypt from "bcryptjs";
class UserProvider {

    getUser = ({ id, username }) => {
        const { models } = mysql;
        const where = {};
        if (id) {
            where.id = id;
        }
        if (username) {
            where.username = username;
        }
        return models.user.findAll({ where })
    };

    createUser = async (payload) => {
        const { models } = mysql;
        payload.id = uuid();
        payload.password = bcrypt.hashSync(payload.password, 10);
        return models.user.create(payload)
    };

    updateUser = (payload, id) => {
        const { models } = mysql;
        return models.user.update(payload, { where: { id } })
    };

    deleteUser = (id) => {
        const { models } = mysql;
        return models.user.destroy({ where: { id } })
    };
}

export default new UserProvider();