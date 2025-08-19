"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt = require("bcrypt");
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
    async isPasswordValid(password) {
        return await bcrypt.compare(password, this._password);
    }
    get password() {
        return this._password;
    }
    async setPassword(newPassword) {
        this._password = await bcrypt.hash(newPassword, 10);
    }
    toPrimitives() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this._password,
        };
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map