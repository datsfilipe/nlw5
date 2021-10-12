"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../http");
const ConnectionsService_1 = require("../services/ConnectionsService");
const UsersService_1 = require("../services/UsersService");
const MessagesService_1 = require("../services/MessagesService");
http_1.io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService_1.ConnectionsService();
    const usersService = new UsersService_1.UsersService();
    const messagesService = new MessagesService_1.MessagesService();
    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params;
        let { online } = params;
        let user_id = null;
        const userExists = await usersService.findByEmail(email);
        if (!userExists) {
            const user = await usersService.create(email);
            await connectionsService.create({
                socket_id,
                user_id: user.id,
                online
            });
            user_id = user.id;
        }
        else {
            user_id = userExists.id;
            const connection = await connectionsService.findByUserId(userExists.id);
            if (!connection) {
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id,
                    online
                });
            }
            else {
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
            ;
        }
        ;
        await messagesService.create({
            text,
            user_id
        });
        const allMessages = await messagesService.listByUser(user_id);
        socket.emit("client_list_all_messages", allMessages);
        await connectionsService.updateOnlineStatus(user_id, online);
        const allUsers = await connectionsService.findAllAvailable();
        http_1.io.emit("admin_list_all_users", allUsers);
    });
    socket.on("client_send_to_admin", async (params) => {
        const { text, socket_admin_id } = params;
        const socket_id = socket.id;
        const { user_id } = await connectionsService.findBySocketId(socket_id);
        const message = await messagesService.create({
            text,
            user_id
        });
        http_1.io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id,
        });
    });
    socket.on("close_connection", async (params) => {
        const { socket_id, socket_admin_id } = params;
        let { online } = params;
        const { user_id } = await connectionsService.findBySocketId(socket_id);
        await connectionsService.updateOnlineStatus(user_id, online);
        const allConnectionsAvailable = connectionsService.findAllAvailable();
        http_1.io.to(socket_admin_id).emit("admin_list_all_users", allConnectionsAvailable);
    });
});
//# sourceMappingURL=client.js.map