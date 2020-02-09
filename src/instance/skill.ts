import {Skill} from "../models/skill";
import {CS} from "../models/cs";
import {CSInstance} from "./cs";
import {SKILL_TYPE, TARGET_ARRANGE} from "../util/battle_util";
import {Unit} from "./unit";

export class SkillInstance
{
    constructor( skill_model : Skill, cs_model? : CS )
    {

        this.skill_id = skill_model.id;
        this.skill_name = skill_model.name;
        this.skill_type = skill_model.skill_type;
        this.target_arrange = skill_model.target_arrange;

        this.cooltime = skill_model.cooltime;
        this.use_ap = skill_model.use_ap;
        this.damage = skill_model.damage;

        this.remain_cooltime = 0;
        this.create_flag = true;

        if( !cs_model )
        {
            return;
        }

        if ( skill_model.cs_key != cs_model.id )
        {
            console.log("SKILL CREATE FAILED");
            this.create_flag = false;
        }


        this.cs_instance = new CSInstance( skill_model, cs_model );

    }

    GetRemainCooltime()
    {
        return this.remain_cooltime;
    }

    GetSkillType()
    {
        return this.skill_type;
    }

    GetTargetArrange()
    {
        return this.target_arrange;
    }

    CheckResource( unit : Unit ) : boolean
    {
        if ( this.remain_cooltime > 0 )
        {
            return false;
        }

        return unit.CheckResource(this.use_ap);
    }

    UseSkill()
    {
        this.remain_cooltime = this.cooltime;
    }


    ProcTurn( )
    {
        if ( this.remain_cooltime > 0 )
        {
            this.remain_cooltime -= 1;
        }
    }

    CopyCS() : CSInstance | null
    {
        if( !this.cs_instance )
        {
            return null;
        }

        if ( !this.create_flag )
        {
            return null;
        }

        return this.cs_instance.clone();
    }


    readonly skill_id : number;
    readonly skill_name : string;
    readonly cs_instance? : CSInstance;

    //read only property.
    readonly create_flag : boolean;
    readonly skill_type : SKILL_TYPE;
    readonly target_arrange : TARGET_ARRANGE;
    readonly damage : number;

    // 자원 사용량
    readonly cooltime : number;
    readonly use_ap : number;

    private remain_cooltime : number;
}