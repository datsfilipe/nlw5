"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const MessagesService_1 = require("../services/MessagesService");
class MessagesController {
    async create(request, response) {
        const { admin_id, text, user_id } = request.body;
        const messagesService = new MessagesService_1.MessagesService();
        const message = await messagesService.create({
            admin_id,
            text,
            user_id
        });
        return response.json(message);
    }
    ;
    async showByUser(request, response) {
        const { id } = request.params;
        const messagesService = new MessagesService_1.MessagesService();
        const list = await messagesService.listByUser(id);
        return response.json(list);
    }
}
exports.MessagesController = MessagesController;
;
//# sourceMappingURL=MessagesController.js.map