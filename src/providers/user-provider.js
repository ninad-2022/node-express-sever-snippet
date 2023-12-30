import { uuid } from 'uuidv4'
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

    createUser = (payload) => {
        const { models } = mysql;
        payload.id = uuid();
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
export default new UserProvider()