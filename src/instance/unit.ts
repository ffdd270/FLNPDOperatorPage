import {Character} from '../models/character'


// Character 의 Instance
export class Unit
{
    private static uid_count  : number = 0;

    constructor( character : Character, is_enemy: boolean )
    {
        Unit.uid_count += 1;
        this.character_unique_id = is_enemy ? Unit.uid_count * -1 : Unit.uid_count;

        this.max_hp = character.max_hp;
        this.max_ap = character.max_ap;

        this.hp = this.max_hp;
        this.ap = this.max_ap;
        this.att = character.att == null ? 1 : character.att;
        this.att_acc = character.att_acc == null ? 1 : character.att_acc;

        this.name = character.name;
    }

    GetName()
    {
        return this.name;
    }

    GetUID( )
    {
        return this.character_unique_id;
    }

    GetHp()
    {
        return this.hp;
    }

    GetMaxHp( )
    {
        return this.max_hp;
    }

    GetAp()
    {
        return this.ap;
    }

    GetMaxAp()
    {
        return this.max_ap;
    }

    GetDamage()
    {
        return this.att;
    }

    isDead( )
    {
        return this.hp <= 0;
    }

    CounterAble( )
    {
        return true;
    }

    ProcDice( ) : number
    {
        let dice_max = 20;
        let dice_min = 1;

        let dice =  Math.floor(Math.random() * ( dice_max - dice_min ) ) + dice_min;
        // 뭘 할거임. 다이스 버프라던가..

        return dice;
    }

    DecHp( dmg : number )
    {
        this.hp -= dmg;

        return dmg;
    }


    private character_unique_id : number;

    private max_hp : number;
    private max_ap : number;

    private hp : number;
    private ap : number;
    private att : number;
    private att_acc : number;

    private name : string;
}