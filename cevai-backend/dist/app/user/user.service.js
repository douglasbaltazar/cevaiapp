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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const User_entity_1 = require("./entity/User.entity");
const common_2 = require("@nestjs/common");
let UserService = exports.UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        return await this.usersRepository.find({
            select: ['id', 'firstName', 'lastName', 'email', 'status', 'gender'],
        });
    }
    async findOne(id) {
        try {
            return await this.usersRepository.findOneByOrFail({ id });
        }
        catch (error) {
            throw new common_2.NotFoundException(error.message);
        }
    }
    async create(data) {
        return await this.usersRepository.save(this.usersRepository.create(data));
    }
    async update(id, data) {
        const user = await this.findOne(id);
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }
    async deleteById(id) {
        await this.findOne(id);
        await this.usersRepository.softDelete(id);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(User_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map