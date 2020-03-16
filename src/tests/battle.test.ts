import {Sequelize} from "sequelize-typescript";
import {Character} from "../models/character";
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Database} from "../database";

import {User} from "../models/user";
import {UserController} from "../controllers/user";
import {expect} from "chai";
import {TestHelper} from "./test_helper.test";
import {Skill} from "../models/skill";
import {CS} from "../models/cs";
import {Unit} from "../instance/unit";
import {BattleController} from "../controllers/battle";


describe( 'Battle Test', ()=>
{
    let user_model : User;

    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User, Skill, CS] );

        user_model = await TestHelper.makeUser( "ffdd270" );
    }

    it("create battle and push unit.", async () =>
    {
        await initDataBase();

        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );
        let kiri_unit = new Unit( character_model, false );
        let battle = BattleController.CreateBattle( "Good Battle" );
        expect(battle).not.equal( undefined );

        if ( battle == undefined )
        {
            return;
        }

        battle.AddPartyMember( kiri_unit );
        let unit = battle.GetPartyMember( kiri_unit.unit_unique_id );
        expect(unit).to.equal( kiri_unit );
    });

    it("create battle, push unit, and enemy.", async ( ) =>
    {
        await initDataBase();

        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );

        let friend_unit = new Unit( character_model, false );
        let enemy_unit = new Unit( character_model, true );
        let battle = BattleController.CreateBattle( "Good Battle" );

        if ( battle == undefined )
        {
            return false;
        }

        battle.AddPartyMember( friend_unit );
        battle.AddEnemyMember( enemy_unit );

        expect( battle.GetAllBattleMember().length ).to.equal( 2 );
    });

});