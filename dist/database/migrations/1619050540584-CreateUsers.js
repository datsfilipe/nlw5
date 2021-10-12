"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers1619050540584 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsers1619050540584 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.CreateUsers1619050540584 = CreateUsers1619050540584;
//# sourceMappingURL=1619050540584-CreateUsers.js.map