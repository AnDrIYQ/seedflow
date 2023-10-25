const authService = require('../services/AuthService');

class AuthController {
    async login(request, response) {
        const { username, password } = request.body;
        const result = await authService.login(username, password);
        if (result == 500) {
            response.status(500).json({ message: 'Помилка сервера' });
            return false;
        }
        if (result == 401) {
            response.status(401).json({ message: 'Неправильне ім\'я користувача або пароль' });
            return false;
        }
        response.json({ token: result });
    }
    async register(request, response, next) {
        const { login, password, avatar, phone } = request.body;
        try {
            const user = await authService.register(login, password, avatar, phone, 'customer');
            request.body.username = user.login;
            request.body.password = user.password;
            next();
        } catch {
            response.status(500).json({ message: 'Помилка сервера' });
        }
    }
}

module.exports = new AuthController();