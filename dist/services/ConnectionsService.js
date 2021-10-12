"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionsService = void 0;
const typeorm_1 = require("typeorm");
const Connection_1 = require("../entities/Connection");
const ConnectionsRepository_1 = require("../repositories/ConnectionsRepository");
class ConnectionsService {
    constructor() {
        this.connectionsRepository = typeorm_1.getCustomRepository(ConnectionsRepository_1.ConnectionsRepository);
    }
    ;
    async create({ socket_id, user_id, admin_id, id, online }) {
        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id,
            online
        });
        await this.connectionsRepository.save(connection);
        return connection;
    }
    ;
    async findByUserId(user_id) {
        const connection = await this.connectionsRepository.findOne({
            user_id
        });
        return connection;
    }
    ;
    async findAllWithoutAdmin() {
        const connections = await this.connectionsRepository.find({
            where: { admin_id: null },
            relations: ["user"],
        });
        return connections;
    }
    ;
    async findAllOnline() {
        const connections = await this.connectionsRepository.find({
            where: { online: true },
            relations: ["user"],
        });
        return connections;
    }
    ;
    async findAllAvailable() {
        const connections = await this.connectionsRepository.find({
            where: { online: true, admin_id: null },
            relations: ["user"],
        });
        return connections;
    }
    ;
    async findBySocketId(socket_id) {
        const connection = await this.connectionsRepository.findOne({
            socket_id,
        });
        return connection;
    }
    ;
    async updateAdminId(user_id, admin_id) {
        await this.connectionsRepository
            .createQueryBuilder()
            .update(Connection_1.Connection)
            .set({ admin_id })
            .where("user_id = :user_id", {
            user_id,
        })
            .execute();
    }
    ;
    async updateOnlineStatus(user_id, online) {
        await this.connectionsRepository
            .createQueryBuilder()
            .update(Connection_1.Connection)
            .set({ online })
            .where("user_id = :user_id", {
            user_id,
        })
            .execute();
    }
    ;
}
exports.ConnectionsService = ConnectionsService;
;
//# sourceMappingURL=ConnectionsService.js.map