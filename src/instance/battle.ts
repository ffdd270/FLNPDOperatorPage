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

    IsHaveTurn( uid : number ) : boolean
    {
        if( this.on_turn_unit == null )
        {
            return false;
        }

        return this.on_turn_unit.unit_unique_id == uid
    }

    SetHaveTurnUnit( uid : number ) : Unit | null
    {
        let party_member = this.party.get(uid);

        if (party_member == undefined)
        {
            return null;
        }

        this.on_turn_unit = party_member;
        return this.on_turn_unit;
    }

    readonly id : string;
    private on_turn_unit : Unit | null = null;
    private readonly party : Map<number, Unit>;
    private readonly enemy_party : Map<number, Unit>;
}