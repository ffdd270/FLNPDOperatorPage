import {SkillSet} from "../models/skill_set";
import {Skill} from "../models/skill"
import {SkillSetInstance} from "../instance/skill_set";
import {SkillSetController} from "../controllers/skill_set";

export class SkillSetAction
{

    static CreateSkillSetInstance( skill_set_model : SkillSet, skills : Skill[] ) : SkillSetInstance
    {
        //return new SkillSetInstance( skill_set_model, skills );
    }


}