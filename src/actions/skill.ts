import {Skill} from "../models/skill";
import {CS} from "../models/cs";
import {CS_TIMING} from "../util/battle_util";


export class SkillAction
{
    static AddCS(  skill_model : Skill, cs_model : CS, cs_timing : CS_TIMING, cs_active_turn : number, cs_active_rate : number )
    {
        skill_model.cs_key = cs_model.id;

        skill_model.cs_timing = cs_timing;
        skill_model.cs_active_turn = cs_active_turn;
        skill_model.cs_active_rate = cs_active_rate;
    }
}