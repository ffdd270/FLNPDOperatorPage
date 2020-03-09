import {Unit} from "./unit";


export class Battle
{
    constructor( id : string )
    {
        this.id = id;
        this.party = new Map<number, Unit>();
        this.enemy_party = new Map<number, Unit>();
    }

    private static AddMember(unit : Unit, party : Map<number, Unit> )
    {
        let unit_id = unit.unit_unique_id;
        let is_exist = party.get( unit_id );

        if( is_exist != undefined )
        {
            return false;
        }

        party.set( unit_id, unit );
        return true;
    }

    AddPartyMember( unit : Unit )
    {
        Battle.AddMember(unit, this.party);
    }


    AddEnemyMember( enemy : Unit )
    {
        Battle.AddMember(enemy, this.enemy_party);
    }


    GetPartyMember( id : number )
    {
        return this.party.get( id );
    }

    GetAllPartyMember( ) : Unit[]
    {
        let units : Unit[] = [];

        for ( let item of this.party )
        {
            units.push( item[1] );
        }

        return units;
    }

    readonly id : string;
    private readonly party : Map<number, Unit>;
    private readonly enemy_party : Map<number, Unit>;
}