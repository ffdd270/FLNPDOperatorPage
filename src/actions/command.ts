import {ChatSocket} from "../sockets/chat_socket";
import {DiceResponse, Response} from "../util/response";
import {Dice} from "../instance/dice";

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


    static SetCommands()
    {
        ChatSocket.AddCommandEventFunction("dice", this.ProcDice );
    }



}