"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const typeorm_1 = require("typeorm");
const MessagesRepository_1 = require("../repositories/MessagesRepository");
class MessagesService {
    constructor() {
        this.messagesRepository = typeorm_1.getCustomRepository(MessagesRepository_1.MessagesRepository);
    }
    async create({ admin_id, text, user_id }) {
        const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });
        await this.messagesRepository.save(message);
        return message;
    }
    ;
    async listByUser(user_id) {
        const list = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]
        });
        return list;
    }
    ;
}
exports.MessagesService = MessagesService;
;
//# sourceMappingURL=MessagesService.js.map