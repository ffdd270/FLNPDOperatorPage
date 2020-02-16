import {Unit} from "./unit";


export class Battle
{
    constructor( id : string )
    {
        this.id = id;
        this.party = new Map<number, Unit>();
    }

    AddPartyMember( unit : Unit )
    {
        let unit_id = unit.unit_unique_id;
        let is_exist = this.party.get( unit_id );

        if( is_exist != undefined )
        {
            return false;
        }


        this.party.set( unit_id, unit );
        return true;
    }

    GetPartyMember( id : number )
    {
        return this.party.get( id );
    }



    private id : string;
    private party : Map<number, Unit>;
}