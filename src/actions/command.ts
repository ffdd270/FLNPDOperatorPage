import {CommandSocket} from "../sockets/command_socket";
import {DiceResponse, ErrorResponse, Response, TurnResponse, UnknownResponse} from "../util/response";
import {Dice} from "../instance/dice";
import {BattleController} from "../controllers/battle";
import {Battle} from "../instance/battle";

class BattleValueStruct
{
    public unit_uid : number;
    public battle : Battle;

    constructor( unit_uid : number, battle_id : Battle  )
    {
        this.unit_uid = unit_uid;
        this.battle = battle_id;
    }

}


export class CommandActions
{

    private static GetBattleValues(  command : string, params : string, opts : Map<string, string> ) : Response | BattleValueStruct
    {
        if( params == "" )
        {
            return new ErrorResponse( command, "Params Was NULL" );
        }

        let unit_info = parseInt( params );
        let battle_id = opts.get("battle_id");

        if ( battle_id == undefined )
        {
            return new ErrorResponse( command, "SERVER WRONG SEND BATTLE ID");
        }

        let battle = BattleController.GetBattle( battle_id );
        if ( battle == undefined )
        {
            return new ErrorResponse( command, "WRONG BATTLE ID");
        }

        return new BattleValueStruct( unit_info, battle );
    }

    private static ProcDice(  command : string, params : string  ) : Response
    {
        let dice_max = 20;

        if( params != "" )
        {
            dice_max = parseInt( params );
        }

        let dice = new Dice( dice_max );
        return new DiceResponse(dice);
    }

    private static ProcTurn(  command : string, params : string, opts : Map<string, string>  ) : Response
    {
        let return_value = this.GetBattleValues( command, params, opts );

        if ( return_value instanceof Response )
        {
            return <Response>(return_value);
        }

        return_value = <BattleValueStruct>( return_value );

        let unit_info = return_value.unit_uid;
        let battle = return_value.battle;

        let unit = battle.SetHaveTurnUnit( unit_info );
        if( unit == null )
        {
            return new ErrorResponse( command, "WRONG UNIT UID");
        }


        return new TurnResponse( unit );
    }


    private static ProcAttack( command : string, params : string, opts : Map<string, string> ) : Response
    {
        let return_value = this.GetBattleValues( command, params, opts );

        if ( return_value instanceof Response )
        {
            return <Response>(return_value);
        }

        return_value = <BattleValueStruct>( return_value );
    }

    static SetCommands()
    {
        CommandSocket.AddCommandEventFunction("dice", this.ProcDice );
        CommandSocket.AddCommandEventFunction("turn", this.ProcTurn );
}

}