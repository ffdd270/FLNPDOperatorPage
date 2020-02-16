import {Character} from '../models/character'
import {CSInstance} from "./cs";
import {SkillSetInstance} from "./skill_set";
import {SkillInstance} from "./skill";


// Character 의 Instance
export class Unit
{
    private static uid_count  : number = 0;

    constructor( character : Character, is_enemy: boolean )
    {
        Unit.uid_count += 1;
        this.unit_unique_id = is_enemy ? Unit.uid_count * -1 : Unit.uid_count;
        this.db_unique_id = character.id;

        this.max_hp = character.max_hp;
        this.max_ap = character.max_ap;

        this.hp = this.max_hp;
        this.ap = this.max_ap;
        this.att = character.att == null ? 1 : character.att;
        this.att_acc = character.att_acc == null ? 1 : character.att_acc;

        this.name = character.name;
        this.skill_set_id = character.skill_set_id;

        this.active_cs_list = [];
    }

    SetSkillSet( skill_set : SkillSetInstance )
    {
        if( skill_set.skill_set_id != this.skill_set_id)
        {
            console.log("ERROR! SetSkillSet.");
            return false;
        }

        this.skill_set_instance = skill_set;
    }

    GetName()
    {
        return this.name;
    }

    GetUID( )
    {
        return this.unit_unique_id;
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

    GetSkill( index : number ) : SkillInstance | null
    {
        if ( !this.skill_set_instance )
        {
            return null
        }

        return this.skill_set_instance.GetSkill(index);
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

    ProcTurn()
    {
        for ( let cs of this.active_cs_list )
        {
            cs.ProcTurn();
            console.log( "CS : ", cs.GetName(), " REMAIN ? ", cs.GetRemainTurn(), " ACTIVE ? ", cs.isEnd() );
        }

        for ( let i = this.active_cs_list.length - 1;  i >= 0; --i )
        {
            let cs_inst = this.active_cs_list[i];
            console.log( "i?", i, "cs_inst", cs_inst);

            if( cs_inst.isEnd() )
            {
                this.active_cs_list.splice( i, 1 );
            }
        }

        if( this.skill_set_instance )
        {
            this.skill_set_instance.ProcTurn();
        }
    }

    CheckResource( need_ap : number )
    {
        return this.ap >= need_ap;
    }

    UseResource(  need_ap : number )
    {
        this.ap -= need_ap;
    }

    AddResource( add_ap : number)
    {
        this.ap += add_ap;
    }

    AddCS( cs_inst : CSInstance ) : CSInstance
    {
        this.active_cs_list.push( cs_inst );

        return cs_inst;
    }

    GetCSList()
    {
        return this.active_cs_list;
    }

    DecHp( dmg : number ) : number
    {
        this.hp -= dmg;

        return dmg;
    }

    readonly unit_unique_id : number;
    readonly db_unique_id : number;
    readonly max_hp : number;
    readonly max_ap : number;

    private hp : number;
    private ap : number;
    readonly att : number;
    private att_acc : number;

    readonly skill_set_id : number;

    readonly active_cs_list : CSInstance[];
    private skill_set_instance? : SkillSetInstance;

    readonly name : string;
}