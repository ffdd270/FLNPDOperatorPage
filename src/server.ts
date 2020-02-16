import app from "./app";


//Socket Server Import.\

import SocketIO from "socket.io";
import {connection_on} from "./sockets/connection";
import {BattleSocket} from "./sockets/battle_socket";
import * as http from "http";

const server = http.createServer( app );
// Socket Init Start.

const io = SocketIO(server);
connection_on( io );
// 소켓 Static Class 초기화.
BattleSocket.SetSocket( io );


server.listen( app.get('port'), () =>{
    console.log(
        "App is Running at http://localhost:%d",
        app.get("port")
    );

} );

io.attach( server );



export default server;
