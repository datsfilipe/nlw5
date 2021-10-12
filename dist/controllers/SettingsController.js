"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsController = void 0;
const SettingsService_1 = require("../services/SettingsService");
class SettingsController {
    async create(request, response) {
        const { chat, username } = request.body;
        const settingsService = new SettingsService_1.SettingsService();
        try {
            const settings = await settingsService.create({ chat, username });
            return response.json(settings);
        }
        catch (err) {
            return response.status(400).json({
                message: err.message
            });
        }
        ;
    }
    async findByUsername(request, response) {
        const { username } = request.params;
        const settingsService = new SettingsService_1.SettingsService();
        const settings = await settingsService.findByUsername(username);
        return response.json(settings);
    }
    async update(request, response) {
        const { username } = request.params;
        const { chat } = request.body;
        const settingsService = new SettingsService_1.SettingsService();
        const settings = await settingsService.update(username, chat);
        return response.json(settings);
    }
    ;
}
exports.SettingsController = SettingsController;
;
//# sourceMappingURL=SettingsController.js.map