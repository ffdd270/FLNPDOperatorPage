import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {UnitResponse} from "../util/response";

export class ChatSocket
{
    static SetSocket( io : SocketIO.Server )
    {
        this.io = io;
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