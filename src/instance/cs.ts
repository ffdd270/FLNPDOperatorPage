import {CS} from "../models/cs";
import {CS_TIMING, CS_TYPE} from "../util/battle_util";
import {Skill} from "../models/skill";


export class CSInstance
{
    constructor( skill_model : Skill,  cs_model : CS )
    {
        this.name = cs_model.id;
        this.desc = cs_model.desc;

        this.cs_type = cs_model.cs_type;
        this.cs_timing = skill_model.cs_timing;

        console.log("skill_model.cs_active_turn", skill_model.cs_active_turn);
        this.active_turn = skill_model.cs_active_turn;
        this.remain_turn = this.active_turn;
    }

    clone() : CSInstance
    {
        return <CSInstance>(
            Object.assign({}, this )
        );
    }

    ProcTurn( )
    {
        this.remain_turn -= 1;

        return this.isEnd();
    }

    isEnd()
    {
        return this.remain_turn <= 0;
    }

    GetName()
    {
        return this.name;
    }

    GetDesc()
    {
        return this.desc;
    }

    GetTiming()
    {
        return this.cs_timing;
    }

    GetType()
    {
        return this.cs_type;
    }

    GetRemainTurn()
    {
        return this.remain_turn;
    }


    readonly name : string;
    readonly desc : string;

    readonly cs_type : CS_TYPE;
    readonly cs_timing : CS_TIMING;
    readonly active_turn : number;
    private remain_turn : number;
}