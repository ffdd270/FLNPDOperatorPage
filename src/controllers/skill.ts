import {Skill} from '../models/skill';
import {SKILL_TYPE, TARGET_ARRANGE} from "../util/battle_util";


export class SkillController
{
    static async AddSkill(name: string, skill_type: SKILL_TYPE, target_arrange: TARGET_ARRANGE, cooltime : number, damage : number): Promise<Skill | boolean>
    {
        let skill = await new Skill({name: name, skill_type: skill_type, target_arrange: target_arrange, cooltime: cooltime, damage: damage});
        await skill.save();

        return skill;
    }


    static async FindSkillById( skill_id : number ) : Promise<Skill | boolean>
    {
        let skill = await Skill.findOne( { where: {id: skill_id } } );

        if (skill == null)
        {
            return false;
        }

        return skill;
    }
}
