import app from "./app";


//Socket Server Import.\

import SocketIO from "socket.io";
import {connection_on} from "./routes/connection";
import * as http from "http";



const server = http.createServer( app );
//connection_on( io );

// Socket Init Start.
const io = SocketIO(server);
connection_on( io );

server.listen( app.get('port'), () =>{
    console.log(
        "App is Running at http://localhost:%d",
        app.get("port")
    );

} );

io.attach( server );



export default server;
