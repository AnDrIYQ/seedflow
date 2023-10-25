const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

class AuthService {
    _generateToken(user) {
        const payload = {
            id: user.id,
            username: user.username
        };
        const options = {
            expiresIn: '1h'
        };
        return jwt.sign(payload, config.jwtSecret, options);
    }

    async register(login, password, avatar = null, phone = null, role = 'customer') {
        return await User.create({
            login,
            password,
            avatar,
            phone,
            role,
        });
    }
    async login(username, password) {
        // Перевірка користувача в базі даних (припустимо, що ми використовуємо mongoose)
        return new Promise((resolve) => {
            User.findOne({ login: username, password })
                .then(user => {
                    if (user) {
                        const token = this._generateToken(user);
                        resolve(token);
                    } else {
                        resolve(401);
                    }
                })
                .catch(error => {
                    resolve(500);
                });
        });
    }
}

module.exports = new AuthService();