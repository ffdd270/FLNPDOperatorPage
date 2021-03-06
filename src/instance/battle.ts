import {Unit} from "./unit";


export class Battle
{
    constructor( id : string )
    {
        this.id = id;
        this.party = new Map<number, Unit>();
        this.enemy_party = new Map<number, Unit>();
        this.all_member  = new Map<number, Unit>();
    }

    private AddMember(unit : Unit, party : Map<number, Unit> )
    {
        let unit_id = unit.unit_unique_id;
        let is_exist = party.get( unit_id );

        if( is_exist != undefined )
        {
            return false;
        }

        party.set( unit_id, unit );
        this.all_member.set( unit_id, unit ); // 모든 파티 !

        return true;
    }

    AddPartyMember( unit : Unit )
    {
        this.AddMember(unit, this.party);
    }


    AddEnemyMember( enemy : Unit )
    {
        this.AddMember(enemy, this.enemy_party);
    }


    // 아군만
    GetPartyMember( id : number )
    {
        return this.party.get( id );
    }

    //전체다
    GetBattleMember( id : number )
    {
        return this.all_member.get( id );
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

    GetAllBattleMember() : Unit[]
    {
        let units : Unit[] = [];

        for ( let item of this.all_member )
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

    GetHaveTurnUnit( ) : Unit | null
    {
        return this.on_turn_unit;
    }

    SetHaveTurnUnit( uid : number ) : Unit | null
    {
        let party_member = this.all_member.get(uid);

        if (party_member == undefined)
        {
            return null;
        }

        this.on_turn_unit = party_member;
        return this.on_turn_unit;
    }

    readonly id : string;
    private on_turn_unit : Unit | null = null;

    private readonly all_member : Map<number, Unit>;
    private readonly party : Map<number, Unit>;
    private readonly enemy_party : Map<number, Unit>;
}