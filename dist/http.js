"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.http = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
require("./database");
const routes_1 = require("./routes");
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.set("views", path_1.default.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.get("/", (request, response) => {
    return response.render("html/client.html");
});
app.get("/admin", (request, response) => {
    return response.render("html/admin.html");
});
const http = http_1.createServer(app);
exports.http = http;
const io = new socket_io_1.Server(http);
exports.io = io;
io.on("connection", (socket) => {
});
app.use(express_1.default.json());
app.use(routes_1.routes);
//# sourceMappingURL=http.js.map