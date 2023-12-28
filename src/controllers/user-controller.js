import userProvider from "../providers/user-provider.js";

class UserController {

    getUser = (req, res, next) => {
        return userProvider.getUser()
            .then(res => {
                console.log('res: ', res);
                return res.status(200).send('Hello, this is the root route!')
            })
            .catch(next)
    };

    createUser = (req, res, next) => {
        return userProvider.createUser()
            .then(res => {
                return res.status(200).send('Hello, this is the root route!')
            })
            .catch(next)
    };

    updateUser = (req, res, next) => {
        return userProvider.updateUser()
            .then(res => {
                return res.status(200).send('Hello, this is the root route!')
            })
            .catch(next)
    };

    deleteUser = (req, res, next) => {
        return userProvider.deleteUser()
            .then(res => {
                return res.status(200).send('Hello, this is the root route!')
            })
            .catch(next)
    };

    helloWorld = (req, res, next) => {
        return res.status(200).json({ message: 'Hello from the API!' });
    }

}

export default new UserController();