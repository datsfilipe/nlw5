import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesService } from "../services/MessagesService";

interface IParams {
  text: string
  email: string
  online: boolean
}

io.on("connect", (socket) => {
  const connectionsService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on("client_first_access", async params => {
    const socket_id = socket.id;
    const { text, email, online } = params as IParams;
    let user_id = null;

    const userExists = await usersService.findByEmail(email);

    if (!userExists) {
      const  user = await usersService.create(email);

      await connectionsService.create({
        socket_id,
        user_id: user.id,
        online
      });

      user_id = user.id;
    } else {
      user_id = userExists.id;

      const connection = await connectionsService.findByUserId(userExists.id);

      if(!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id,
          online
        })
      } else {
        connection.socket_id = socket_id;
        await connectionsService.create(connection);
      };
    };

    await connectionsService.updateOnlineStatus(user_id, online);

    await messagesService.create({
      text,
      user_id
    });

    const allMessages = await messagesService.listByUser(user_id);

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await connectionsService.findAllAvailable();

    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async params => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;

    const { user_id } = await connectionsService.findBySocketId(socket_id);

    const message = await messagesService.create({
      text,
      user_id
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });
  socket.on("close_connection", async params => {
    const { online, socket_id, socket_admin_id } = params;

    const { user_id } = await connectionsService.findBySocketId(socket_id);

    await connectionsService.updateOnlineStatus(user_id, online);
    
    const allConnectionsAvailable = connectionsService.findAllAvailable();
    
    io.to(socket_admin_id).emit("admin_list_all_users", allConnectionsAvailable);
  });
});