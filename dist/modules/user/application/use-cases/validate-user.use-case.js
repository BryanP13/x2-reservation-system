"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserUseCase = void 0;
class ValidateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user)
            return null;
        const isValid = user.isPasswordValid(dto.password);
        if (!isValid)
            return null;
        return user;
    }
}
exports.ValidateUserUseCase = ValidateUserUseCase;
//# sourceMappingURL=validate-user.use-case.js.map