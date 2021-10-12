"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("./http");
require("./websocket/client");
require("./websocket/admin");
http_1.http.listen(3333, () => {
    console.log("The server is running on port 3333");
});
//# sourceMappingURL=server.js.map