import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {Response, DiceResponse, UnitResponse, UnknownResponse} from "../util/response";
import {connection_on} from "./connection";
import {Dice} from "../instance/dice";

export type CommandEventFunc = (command : string, params : string) => Response;

export class ChatSocket
{
    private static ProcCommand( string : string )
    {
        if( !string.startsWith("/") )
        {
            return;
        }

        let reg_exp = /^\/([A-z]+)/;
        let result = reg_exp.exec( string );

        if( result == null )
        {
            return;
        }

        let command = result[1];
        let params_reg_exp = /^\/[A-z]+ (.+)/;
        let params = params_reg_exp.exec( string );
        let params_string = "";

        if( params != null )
        {
            params_string = params[1];
        }

        let event_func = ChatSocket.command_event_func_map.get( command );
        if( event_func == undefined )
        {
            ChatSocket.io.emit("command", new UnknownResponse( command ).MakeObject() );
            return;
        }

        let response = event_func( command, params_string );
        ChatSocket.io.emit("command", response.MakeObject() );
    }

    private static onListenChat( msg : any )
    {
        let chat_msg = <string>( msg.msg );
        let chat_talker = <string>( msg.sender );

        console.log( chat_msg );

        if( chat_msg.startsWith("/") )
        {
            ChatSocket.ProcCommand( chat_msg );
        }

        ChatSocket.io.emit('chat_income', { sender: chat_talker, msg: chat_msg } );
    }


    static SetSocket( io : SocketIO.Server, socket : SocketIO.Socket )
    {
        this.io = io;

        socket.on( 'chat', this.onListenChat );

    }

    static AddCommandEventFunction( event_name : string, event_func : CommandEventFunc )
    {
        ChatSocket.command_event_func_map.set( event_name, event_func );
    }


    private static io : SocketIO.Server;
    private static command_event_func_map : Map<string, CommandEventFunc> = new Map<string, CommandEventFunc>();
}