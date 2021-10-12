"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const typeorm_1 = require("typeorm");
const UsersRepository_1 = require("../repositories/UsersRepository");
class UsersService {
    constructor() {
        this.usersRepository = typeorm_1.getCustomRepository(UsersRepository_1.UsersRepository);
    }
    async create(email) {
        const userExists = await this.usersRepository.findOne({
            email
        });
        if (userExists) {
            return userExists;
        }
        ;
        const user = this.usersRepository.create({
            email
        });
        await this.usersRepository.save(user);
        return user;
    }
    ;
    async findByEmail(email) {
        const user = await this.usersRepository.findOne({
            email
        });
        return user;
    }
}
exports.UsersService = UsersService;
;
//# sourceMappingURL=UsersService.js.map