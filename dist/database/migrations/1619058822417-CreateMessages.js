"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessages1619058822417 = void 0;
const typeorm_1 = require("typeorm");
class CreateMessages1619058822417 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "messages",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "admin_id",
                    type: "uuid",
                    isNullable: true,
                },
                {
                    name: "user_id",
                    type: "uuid",
                },
                {
                    name: "text",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
            foreignKeys: [
                {
                    name: "FkUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                },
            ],
        }));
    }
    ;
    async down(queryRunner) {
        await queryRunner.dropTable("messages");
    }
}
exports.CreateMessages1619058822417 = CreateMessages1619058822417;
//# sourceMappingURL=1619058822417-CreateMessages.js.map