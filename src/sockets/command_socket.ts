import SocketIO from "socket.io";
import {Unit} from "../instance/unit";
import {Response, DiceResponse, UnitResponse, UnknownResponse} from "../util/response";
import {connection_on} from "./connection";
import {Dice} from "../instance/dice";

export type CommandEventFunc = (command : string, params : string) => Response;
export type CommandEventOptsFunc = (command : string, params : string, opts: Map<string, string> ) => Response;

export class CommandSocket
{
    private static ProcCommand( string : string, battle_id : string )
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

        let event_func = CommandSocket.command_event_func_map.get( command );
        if( event_func == undefined )
        {
            CommandSocket.io.emit("command", new UnknownResponse( command ).MakeObject() );
            return;
        }

        let opts_hash  : Map<string, string> = new Map<string, string>();
        opts_hash.set( "battle_id", battle_id );

        let response = event_func( command, params_string, opts_hash );
        CommandSocket.io.emit("command", response.MakeObject() );
    }

    private static onListenCommand( msg : any )
    {
        let chat_msg = <string>( msg.msg );
        let chat_talker = <string>( msg.sender );
        let chat_battle_id = <string>( msg.battle_id );

        console.log( chat_msg );

        if( chat_msg.startsWith("/") )
        {
            CommandSocket.ProcCommand( chat_msg, chat_battle_id );
        }

        CommandSocket.io.emit('chat_income', { sender: chat_talker, msg: chat_msg } );
    }


    static SetSocket( io : SocketIO.Server, socket : SocketIO.Socket )
    {
        this.io = io;

        socket.on( 'chat', this.onListenCommand );
        socket.on( 'command', this.onListenCommand );

    }

    static AddCommandEventFunction( event_name : string, event_func : CommandEventFunc | CommandEventOptsFunc )
    {
        CommandSocket.command_event_func_map.set( event_name, event_func );
    }


    private static io : SocketIO.Server;
    private static command_event_func_map : Map<string, CommandEventFunc | CommandEventOptsFunc> = new Map<string, CommandEventFunc | CommandEventOptsFunc>();
}