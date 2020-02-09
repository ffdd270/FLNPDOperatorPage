import {SkillSet} from "../models/skill_set";
import {Skill} from "../models/skill";
import {SkillInstance} from "./skill";
import {CS} from "../models/cs";

export class SkillSetInstance
{
    constructor( skill_set_model : SkillSet, skills : SkillInstance[] )
    {
        this.skills = skills;
        this.name = skill_set_model.skill_set_name;
        this.desc = skill_set_model.skill_set_desc;
        this.skill_set_id = skill_set_model.id;
    }

    GetSkill( index : number ) : SkillInstance
    {
        return this.skills[ index ];
    }

    ProcTurn( )
    {
        for( let skill of this.skills )
        {
            skill.ProcTurn();
        }
    }

    readonly skills : SkillInstance[];
    readonly name : string;
    readonly desc : string;
    readonly skill_set_id : number;
}