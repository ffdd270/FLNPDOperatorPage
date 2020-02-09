import {SkillSet} from "../models/skill_set";
import {Skill} from "../models/skill";
import {SkillController} from "./skill";
import {CS} from "../models/cs";
import {SkillInstance} from "../instance/skill";
import {CSController} from "./cs";
import {SkillSetInstance} from "../instance/skill_set";

export class SkillSetController
{
    static async AddSkillSet( skill_set_name : string , skill_id1 : number, skill_id2? : number, skill_id3? : number ) : Promise<SkillSet | boolean>
    {
        let new_skill_set = await new SkillSet( { skill_set_name: skill_set_name, skill_id1: skill_id1, skill_id2: skill_id2, skill_id3: skill_id3 } );
        await new_skill_set.save();

        return new_skill_set;
    }

    static async GetSkills( skill_set_model: SkillSet ) : Promise<Skill[] | boolean>
    {
        let skill_ids : number[] = [ skill_set_model.skill_id1, skill_set_model.skill_id2, skill_set_model.skill_id3 ];
        let skills : Skill[] = [];

        for (let skill_id of skill_ids)
        {
            if ( skill_id == undefined )
            {
                break;
            }

            let skill = await SkillController.FindSkillById( skill_id );

            if ( skill == false )
            {
                break;
            }

            skills.push( <Skill>(skill) );
        }

        return skills;
    }


    static async GetSkillSetInstance( skill_set_model: SkillSet ) : Promise<SkillSetInstance | boolean>
    {
        let skills = await this.GetSkills( skill_set_model );

        if( skills == false )
        {
            return false;
        }

        let skill_instances : SkillInstance[] = [];
        let skill_array = <Skill[]>(skills);

        for ( let skill of skill_array )
        {
            let cs = await CSController.FindCS( skill.cs_key );
            let skill_inst : SkillInstance;

            if( cs != false )
            {
                skill_inst = new SkillInstance( skill, <CS>(cs) );
            }
            else
            {
                skill_inst = new SkillInstance( skill );
            }

            skill_instances.push( skill_inst );
        }

        return new SkillSetInstance( skill_set_model, skill_instances );
    }
}