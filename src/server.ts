import app from "./app";


//Socket Server Import.\

import SocketIO from "socket.io";
import {connection_on} from "./routes/connection";
import * as http from "http";



const server = http.createServer( app );
//connection_on( io );

// Socket Init Start.
const io = SocketIO(server);


server.listen( app.get('port'), () =>{
    console.log(
        "App is Running at http://localhost:%d",
        app.get("port")
    );

} );

io.on('connection', function ( socket : SocketIO.Socket)
{
    console.log( 'user connection.');
    socket.broadcast.emit("hi");

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chatMessage', function(msg)
    {
        console.log('chatMessage.' + msg);
        io.emit('chatMessage', msg);
    })
});


io.attach( server );



export default server;
