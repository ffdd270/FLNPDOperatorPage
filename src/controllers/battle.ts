import {Battle} from "../instance/battle";
import {BattleResponse} from "../util/response";


export class BattleController
{
    static CreateBattle( battle_name : string )
    {
        this.battles.set( battle_name, new Battle( battle_name ));

        return this.battles.get( battle_name );
    }

    static GetBattle( battle_name : string )
    {
        return this.battles.get( battle_name )
    }

    static GetBattlesResponse()
    {
        let battle_array : BattleResponse[] = [];

        BattleController.battles.forEach(( value )=>
        {
            battle_array.push( new BattleResponse(value) );
        });

        return battle_array;
    }

    private static battles : Map<string, Battle> = new Map<string, Battle>();
}