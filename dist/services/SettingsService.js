"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const typeorm_1 = require("typeorm");
const Setting_1 = require("../entities/Setting");
const SettingsRepository_1 = require("../repositories/SettingsRepository");
class SettingsService {
    constructor() {
        this.settingsRepository = typeorm_1.getCustomRepository(SettingsRepository_1.SettingsRepository);
    }
    async create({ chat, username }) {
        const userAlreadyExists = await this.settingsRepository.findOne({ username });
        if (userAlreadyExists) {
            throw new Error("User already exists!");
        }
        ;
        const settings = this.settingsRepository.create({
            chat,
            username
        });
        await this.settingsRepository.save(settings);
        return settings;
    }
    async findByUsername(username) {
        const settings = await this.settingsRepository.findOne({
            username
        });
        return settings;
    }
    ;
    async update(username, chat) {
        const settings = await this.settingsRepository.createQueryBuilder()
            .update(Setting_1.Setting)
            .set({ chat })
            .where("username = :username", {
            username
        })
            .execute();
    }
}
exports.SettingsService = SettingsService;
;
//# sourceMappingURL=SettingsService.js.map