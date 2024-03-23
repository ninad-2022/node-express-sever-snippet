import { DataTypes } from "sequelize";

const UserModel = (sequelize) => {
    const model = sequelize.define(`user`, {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        username: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        hobbies: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    }, {
        tableName: `user`,
        underscored: false,
        timestamps: false,
    });

    return model;
};

export default UserModel;