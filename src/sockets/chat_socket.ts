import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {DiceResponse, UnitResponse} from "../util/response";
import {connection_on} from "./connection";
import {Dice} from "../instance/dice";

export class ChatSocket
{
    private static ProcCommand( command : string )
    {
        if ( /dice/.exec( command ) != null )
        {
            let dice : Dice = new Dice( 20 );
            let dice_response : DiceResponse = new DiceResponse( dice );

            ChatSocket.io.emit('dice', dice_response.MakeObject() )
        }
    }

    private static onListenChat( msg : any )
    {
        let chat_msg = <string>( msg );
        console.log( chat_msg );

        if( chat_msg.startsWith("/") )
        {
            ChatSocket.ProcCommand( chat_msg )
        }

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