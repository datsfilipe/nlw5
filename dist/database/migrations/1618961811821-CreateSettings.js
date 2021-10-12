"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettings1618961811821 = void 0;
const typeorm_1 = require("typeorm");
class CreateSettings1618961811821 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "settings",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "username",
                    type: "varchar",
                },
                {
                    name: "chat",
                    type: "boolean",
                    default: true,
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("settings");
    }
}
exports.CreateSettings1618961811821 = CreateSettings1618961811821;
//# sourceMappingURL=1618961811821-CreateSettings.js.map