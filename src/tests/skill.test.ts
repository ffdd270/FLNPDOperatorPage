import {Skill} from "../models/skill";
import {User} from "../models/user";
import {Database} from "../database";
import {Character} from "../models/character";
import {CS} from "../models/cs";
import {TestHelper} from "./test_helper.test";
import {Unit} from "../instance/unit";
import {SkillController} from "../controllers/skill";
import {CS_TIMING, CS_TYPE, SKILL_TYPE, TARGET_ARRANGE} from "../util/battle_util";
import {CSController} from "../controllers/cs";
import {SkillAction} from "../actions/skill";
import makeSkillWithCS = TestHelper.makeSkillWithCS;
import {SkillSet} from "../models/skill_set";
import {SkillSetController} from "../controllers/skill_set";
import {expect} from "chai"
import {SkillSetInstance} from "../instance/skill_set";
import {UnitAction} from "../actions/unit";
import {SkillInstance} from "../instance/skill";

describe( "Skill Test", ()=>
{
    let user_model : User;

    let friend1 : Unit;
    let skill_set : SkillSet;

    let enemy1 : Unit;
    let enemy2 : Unit;


    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User, Skill, CS, SkillSet] );

        user_model = await TestHelper.makeUser( "ffdd270" );

        let friend1_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );

        //스킬 셋 만드는중
        let skill_model1 = await makeSkillWithCS( "일번 스킬", SKILL_TYPE.ACTIVE, TARGET_ARRANGE.SINGLE, "아픔", CS_TYPE.DEBUF, CS_TIMING.ATTACK_BEFORE, 3, 1);
        let skill2 = await SkillController.AddSkill( "이번", SKILL_TYPE.ACTIVE, TARGET_ARRANGE.ALL, 3, 3 );
        let skill_model2 = <Skill>( skill2 );

        skill_set = <SkillSet>( await SkillSetController.AddSkillSet( "멋진 스킬셋", skill_model1.id, skill_model2.id ) );

        friend1_model.skill_set_id = skill_set.id;
        await friend1_model.save();

        friend1 = new Unit( friend1_model, false );

        let enemy1_model = await TestHelper.makeCharacter( user_model, "적 1", 1 );
        enemy1_model.max_hp = 10;
        await enemy1_model.save();

        enemy1 = new Unit( enemy1_model, true );

        let enemy2_model = await TestHelper.makeCharacter( user_model, "적 2", 1 );
        enemy2_model.max_hp = 7;
        await enemy2_model.save();

        enemy2 = new Unit( enemy2_model, true );
    }


    it( "Skill set make instance? ", async ()=>
    {
        await initDataBase();

        let skill_set_inst = await SkillSetController.GetSkillSetInstance( skill_set );

        expect( skill_set_inst ).not.equal( false );
        friend1.SetSkillSet( <SkillSetInstance>( skill_set_inst ) );

        let skill = friend1.GetSkill(0);
        expect(skill).not.equal( undefined );
        expect(skill).not.equal( null );

        let skill_inst = <SkillInstance>( skill );

        let result = UnitAction.AttackUnitBySkill( friend1, skill_inst,[enemy1, enemy2], enemy1  );
        console.log( result );
        expect(result.is_invalid).not.equal( true);
        expect(skill_inst.GetRemainCooltime()).to.equal( skill_inst.cooltime );
        expect( enemy1.GetCSList().length ).to.equal( 1 );

        console.log(skill_inst);
        console.log(enemy1.GetCSList());
    });



});