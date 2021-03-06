import {CommandSocket} from "../sockets/command_socket";
import {AttackResponse, DiceResponse, ErrorResponse, Response, TurnResponse, UnknownResponse} from "../util/response";
import {Dice} from "../instance/dice";
import {BattleController} from "../controllers/battle";
import {Battle} from "../instance/battle";
import {UnitAction} from "./unit";

class BattleValueStruct
{
    public unit_uid : number;
    public battle : Battle;
    readonly not_response : boolean = true;

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
        let return_value = CommandActions.GetBattleValues( command, params, opts );

        if ( ( <BattleValueStruct>(return_value) ).not_response === undefined )
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
        let return_value = CommandActions.GetBattleValues( command, params, opts );

        if ( ( <BattleValueStruct>(return_value) ).not_response === undefined )
        {
            return <Response>(return_value);
        }

        return_value = <BattleValueStruct>( return_value );

        let target_unit_uid = return_value.unit_uid;
        let target_unit = return_value.battle.GetBattleMember( target_unit_uid );
        if( target_unit == undefined )
        {
            return new ErrorResponse( command, "WRONG UNIT UID");
        }

        let attacking_unit = return_value.battle.GetHaveTurnUnit();
        if( attacking_unit == null )
        {
            return new ErrorResponse( command, "EVERYBODY DOSE NOT HAVE TURN.");
        }

        // 지금은 단일 공격만..
        let attack_result = UnitAction.AttackUnit( attacking_unit,[target_unit], target_unit );

        return new AttackResponse( attack_result );
    }

    static SetCommands()
    {
        CommandSocket.AddCommandEventFunction("dice", CommandActions.ProcDice );
        CommandSocket.AddCommandEventFunction("turn", CommandActions.ProcTurn );
        CommandSocket.AddCommandEventFunction("attack", CommandActions.ProcAttack );
    }

}