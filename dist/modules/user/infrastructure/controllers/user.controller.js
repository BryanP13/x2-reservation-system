"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_use_case_1 = require("../../application/use-cases/create-user.use-case");
const validate_user_use_case_1 = require("../../application/use-cases/validate-user.use-case");
const auth_service_1 = require("../../../auth/services/auth/auth.service");
const passport_1 = require("@nestjs/passport");
let UserController = class UserController {
    createUserUseCase;
    validateUserUseCase;
    authService;
    constructor(createUserUseCase, validateUserUseCase, authService) {
        this.createUserUseCase = createUserUseCase;
        this.validateUserUseCase = validateUserUseCase;
        this.authService = authService;
    }
    async register(dto) {
        const user = await this.createUserUseCase.execute(dto);
        return {
            message: 'User created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    async login(dto) {
        const user = await this.validateUserUseCase.execute(dto);
        if (!user) {
            return {
                message: 'Invalid credentials',
            };
        }
        const token = await this.authService.generateToken({
            id: user.id.toString(),
            email: user.email,
        });
        return {
            message: 'Login successful',
            access_token: token.access_token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
    getProfile(req) {
        return {
            message: 'Protected route access granted',
            user: req.user,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase,
        validate_user_use_case_1.ValidateUserUseCase,
        auth_service_1.AuthService])
], UserController);
//# sourceMappingURL=user.controller.js.map