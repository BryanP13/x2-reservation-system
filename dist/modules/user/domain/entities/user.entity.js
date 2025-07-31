"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    name;
    email;
    _password;
    id;
    constructor(name, email, _password, id) {
        this.name = name;
        this.email = email;
        this._password = _password;
        this.id = id;
    }
    isPasswordValid(password) {
        return this._password === password;
    }
    get password() {
        return this._password;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map