import {Battle} from "../instance/battle";


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

    private static battles : Map<string, Battle> = new Map<string, Battle>();
}