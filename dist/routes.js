"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const MessagesController_1 = require("./controllers/MessagesController");
const SettingsController_1 = require("./controllers/SettingsController");
const UsersController_1 = require("./controllers/UsersController");
const routes = express_1.Router();
exports.routes = routes;
const settingController = new SettingsController_1.SettingsController();
const usersController = new UsersController_1.UsersController();
const messagesController = new MessagesController_1.MessagesController();
routes.post("/settings", settingController.create);
routes.get("/settings/:username", settingController.findByUsername);
routes.put("/settings/:username", settingController.update);
routes.post("/users", usersController.create);
routes.post("/messages", messagesController.create);
routes.get("/messages/:id", messagesController.showByUser);
//# sourceMappingURL=routes.js.map