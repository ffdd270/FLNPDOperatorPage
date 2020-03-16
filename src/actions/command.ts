import {CommandSocket} from "../sockets/command_socket";
import {DiceResponse, ErrorResponse, Response, TurnResponse, UnknownResponse} from "../util/response";
import {Dice} from "../instance/dice";
import {BattleController} from "../controllers/battle";

export class CommandActions
{
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
        if( params != "" )
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

        let unit = battle.SetHaveTurnUnit( unit_info );
        if( unit == null )
        {
            return new ErrorResponse( command, "WRONG UNIT UID");
        }


        return new TurnResponse( unit );
    }

    static SetCommands()
    {
        CommandSocket.AddCommandEventFunction("dice", this.ProcDice );
        CommandSocket.AddCommandEventFunction("turn", this.ProcTurn );
}

}