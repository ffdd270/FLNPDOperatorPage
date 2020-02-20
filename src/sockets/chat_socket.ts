import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {UnitResponse} from "../util/response";

export class ChatSocket
{
    private static onListenChat( msg : any )
    {
        let chat_msg = <string>( msg );
        console.log( chat_msg );

        ChatSocket.io.emit('chat_income', chat_msg );
    }


    static SetSocket( io : SocketIO.Server, socket : SocketIO.Socket )
    {
        this.io = io;

        socket.on( 'chat', this.onListenChat );

    }

    static BroadcastingDice(  )
    {

    }

    static BroadcastingChat( message : string )
    {
        this.io.emit( 'chat income', message );
    }

    private static io : SocketIO.Server;
}