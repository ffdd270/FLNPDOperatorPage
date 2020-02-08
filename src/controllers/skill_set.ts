import {SkillSet} from "../models/skill_set";

export class SkillSetController
{
    static async AddSkillSet( skill_set_name : string ,skill_id1 : number, skill_id2 : number, skill_id3 : number ) : Promise<SkillSet | boolean>
    {
        let new_skill_set = await new SkillSet( { skill_set_name: skill_set_name, skill_id1: skill_id1, skill_id2: skill_id2, skill_id3: skill_id3 } );
        await new_skill_set.save();

        return new_skill_set;
    }
}