"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../http");
const ConnectionsService_1 = require("../services/ConnectionsService");
const MessagesService_1 = require("../services/MessagesService");
http_1.io.on("connect", async (socket) => {
    const connectionsService = new ConnectionsService_1.ConnectionsService();
    const messagesService = new MessagesService_1.MessagesService();
    const allConnectionsAvailable = await connectionsService.findAllAvailable();
    http_1.io.emit("admin_list_all_users", allConnectionsAvailable);
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;
        const allMessages = await messagesService.listByUser(user_id);
        callback(allMessages);
    });
    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;
        await messagesService.create({
            text,
            user_id,
            admin_id: socket.id,
        });
        const { socket_id } = await connectionsService.findByUserId(user_id);
        http_1.io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id,
        });
    });
    socket.on("admin_user_available", async (params) => {
        const { user_id } = params;
        await connectionsService.updateAdminId(user_id, socket.id);
        const allConnectionsAvailable = await connectionsService.findAllOnline();
        http_1.io.emit("admin_list_all_users", allConnectionsAvailable);
    });
});
//# sourceMappingURL=admin.js.map