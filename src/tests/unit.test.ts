import {Unit} from '../instance/unit';
import {Character} from "../models/character";
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Database} from "../database";

import {User} from "../models/user";
import {UserController} from "../controllers/user";
import {expect} from "chai";
import {TestHelper} from "./test_helper.test";
import Test = Mocha.Test;
import {AttackResult, UnitAction} from "../actions/unit";
import {FindUnitByUID} from "../util/battle_util";

describe('Unit Test', ()=>
{
    let user_model : User;

    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User] );

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
});