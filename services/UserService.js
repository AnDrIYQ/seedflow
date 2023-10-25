const UserModel = require('../models/User'); // Припустимо, що ваша модель називається UserModel
const UserDTO = require('../dtos/UserDTO');

class UserService {
    async get() {
        try {
            const users = await UserModel.find({});
            const array = [];
            for (let user of users) {
                array.push(new UserDTO(user));
            }
            return array;
        } catch (error) {
            throw new Error('Помилка при отриманні користувачів: ' + error.message);
        }
    }

    async getByLogin(login) {
        try {
            const user = await UserModel.findOne({ login });
            return user;
        } catch (error) {
            throw new Error('Помилка при отриманні користувача за логіном: ' + error.message);
        }
    }

    async create(login, password, role) {
        try {
            await UserModel.create({ login, password, role });
            const newUser = await UserModel.findOne({ login });
            return new UserDTO(newUser);
        } catch (error) {
            throw new Error('Помилка при створенні користувача: ' + error.message);
        }
    }

    async update(login, newLogin, password, role) {
        try {
            await UserModel.findOneAndUpdate({ login }, { login: newLogin, password, role });
            const updatedUser = await UserModel.findOne({ login: newLogin });
            return updatedUser;
        } catch (error) {
            throw new Error('Помилка при оновленні користувача: ' + error.message);
        }
    }

    async delete(login) {
        try {
            const deletedUser = await UserModel.deleteOne({ login });
            return deletedUser;
        } catch (error) {
            throw new Error('Помилка при видаленні користувача: ' + error.message);
        }
    }
}

module.exports = new UserService();
