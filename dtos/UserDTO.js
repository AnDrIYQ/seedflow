class UserDTO {
    constructor(user) {
        this.login = user.login;
        this.role = user.role;
        this.avatar = user.avatar;
    }
}

module.exports = UserDTO;