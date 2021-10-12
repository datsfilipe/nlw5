"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateConnections1619132888160 = void 0;
const typeorm_1 = require("typeorm");
class CreateConnections1619132888160 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "connections",
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
                    name: "socket_id",
                    type: "varchar",
                },
                {
                    name: "online",
                    type: "boolean",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }));
        await queryRunner.createForeignKey("connections", new typeorm_1.TableForeignKey({
            name: "FkConnectionUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
        }));
    }
    ;
    async down(queryRunner) {
        await queryRunner.dropForeignKey("connections", "FkConnectionUser");
        await queryRunner.dropTable("connections");
    }
}
exports.CreateConnections1619132888160 = CreateConnections1619132888160;
//# sourceMappingURL=1619132888160-CreateConnections.js.map