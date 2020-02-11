import SocketIO from "socket.io";


export function connection_on(  io : SocketIO.Server  )
{
    io.on('connection', function ( socket : SocketIO.Socket )
    {
        console.log( 'user connection.');


        socket.on('init', function(msg)
        {
            console.log( msg );
            socket.emit("welcome", 'Welcome, CLIENT! ${msg.name}');
        });

        socket.on('get_character_by_name', async function( msg )
        {
            let story_id = msg.story_id;
            let name = msg.character_name;

        });

        socket.on('get_character_by_id', async function( msg )
        {
        });


        socket.on('disconnect', function(){
            console.log('user disconnected');
        });


        socket.on('chatMessage', function(msg)
        {
            console.log('chatMessage.' + msg);
            io.emit('chatMessage', msg);
        })
    })
}