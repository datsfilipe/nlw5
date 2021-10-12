"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const User_1 = require("./User");
let Connection = class Connection {
    constructor() {
        if (!this.id) {
            this.id = uuid_1.v4();
        }
        ;
    }
    ;
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Connection.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Connection.prototype, "admin_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Connection.prototype, "socket_id", void 0);
__decorate([
    typeorm_1.JoinColumn({ name: "user_id" }),
    typeorm_1.ManyToOne(() => User_1.User),
    __metadata("design:type", User_1.User)
], Connection.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Connection.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Connection.prototype, "online", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Connection.prototype, "created_at", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Connection.prototype, "updated_at", void 0);
Connection = __decorate([
    typeorm_1.Entity("connections"),
    __metadata("design:paramtypes", [])
], Connection);
exports.Connection = Connection;
//# sourceMappingURL=Connection.js.map