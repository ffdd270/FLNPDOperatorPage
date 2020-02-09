import {Unit} from '../instance/unit';
import {Character} from "../models/character";
import {Database} from "../database";

import {User} from "../models/user";
import {expect} from "chai";
import {TestHelper} from "./test_helper.test";
import {UnitAction} from "../actions/unit";
import {CS_TIMING, CS_TYPE, FindUnitByUID, SKILL_TYPE, TARGET_ARRANGE} from "../util/battle_util";
import {CSInstance} from "../instance/cs";
import {SkillController} from "../controllers/skill";
import {SkillAction} from "../actions/skill";
import {CSController} from "../controllers/cs";
import {Skill} from "../models/skill";
import {CS} from "../models/cs";

describe('Unit Test', ()=>
{
    let user_model : User;

    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User, Skill, CS] );

        user_model = await TestHelper.makeUser( "ffdd270" );
    }

    it( "create unit.", async () =>
    {
        await initDataBase();

        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );
        let unit = new Unit( character_model, false );

        expect( unit.GetHp() ).to.equal( character_model.max_hp );
        expect( unit.GetAp() ).to.equal( character_model.max_ap );
        expect( unit.GetName() ).to.equal( character_model.name );
    });


    it( "attack unit", async () =>
    {
        await initDataBase();

        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );
        let kiri_unit = new Unit( character_model, false );

        let char_model_2 = await TestHelper.makeCharacter( user_model, "카리샤 말린씨", 1 );
        let kari_unit = new Unit(char_model_2, true) ;

        let result = UnitAction.AttackUnit( kiri_unit, [kari_unit], kari_unit );

        expect( result.is_invalid ).not.equal( true );

        expect( result.targets.length ).to.equal( result.invoker_dice.size );
        expect( result.targets.length ).to.equal( result.targets_dice.size );

        for ( let target_uid of result.targets )
        {
            let unit = FindUnitByUID( target_uid, [ kiri_unit, kari_unit ] );
            expect(unit).not.equal( null );

            let unit_inst : Unit = <Unit>(unit);
            let damage = result.damages.get( target_uid );

            expect(damage).not.equal(null);
            let damage_number = <number>( damage );

            expect( unit_inst.GetHp() + damage_number  ).to.equal( unit_inst.GetMaxHp() );
        }

        for ( let target_uid of result.targets )
        {
            console.log( "attacker dice : ", result.invoker_dice.get(target_uid) );
            console.log( "targets dice  : ", result.targets_dice.get(target_uid) );
        }

        console.log( result );
    });

    it( "add cs.", async () =>
    {
        await initDataBase();

        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );
        let kiri_unit = new Unit( character_model, false );

        let skill : Skill | boolean = await SkillController.AddSkill( "키리키리 한 키리",  SKILL_TYPE.ACTIVE, TARGET_ARRANGE.SINGLE,  3, 3 );
        expect(skill).not.equal( false );
        let skill_model : Skill = <Skill>(skill);

        let cs = await CSController.AddCS("아픔", CS_TYPE.DEBUF );
        expect(cs).not.equal( false );

        SkillAction.AddCS( <Skill>(skill), <CS>(cs), CS_TIMING.ATTACK_AFTER, 2, 1 );
        await skill_model.save();

        kiri_unit.AddCS( new CSInstance( skill_model, <CS>( cs ) ) );
        kiri_unit.ProcTurn();
        expect( kiri_unit.GetCSList().length ).to.equal( 1 );

        kiri_unit.ProcTurn();
        expect( kiri_unit.GetCSList().length ).to.equal( 0 );
    });

});