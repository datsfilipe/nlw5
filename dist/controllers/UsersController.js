"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const UsersService_1 = require("../services/UsersService");
class UsersController {
    async create(request, response) {
        const { email } = request.body;
        const usersService = new UsersService_1.UsersService();
        const user = await usersService.create(email);
        return response.json(user);
    }
}
exports.UsersController = UsersController;
;
//# sourceMappingURL=UsersController.js.map