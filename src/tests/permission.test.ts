import {Database} from "../database";
import {Permission, Permissions} from "../models/permission";
import {Character} from "../models/character";
import {User} from "../models/user";
import {Story} from "../models/story";

import {UserController} from "../controllers/user";
import {CharacterController} from "../controllers/character";

import {CharacterAction} from "../actions/character";


import {expect} from "chai";
import {TestHelper} from "./test_helper.test";
import makePermission = TestHelper.makePermission;
import makeUser = TestHelper.makeUser;
import makeStory = TestHelper.makeStory;
import makeCharacter = TestHelper.makeCharacter;
import exp = require("constants");

describe( 'Permission Test', ()=>
{
    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User, Permission, Story] );
    }

    it("set permission", async ()=>
    {
        await initDataBase();

        let user = await makeUser( "ffdd270" );
        await UserController.SetAdmin( user );

        let story = await makeStory( user, "테스트 스토리",  "파-이널 판-타지, 개 빡시는 시뮬레이션- 너-무 빡쳐서 잠이 안온다네.");

        let permission = await makePermission( user, story, Permissions.OP );
        expect(permission.permission).to.equal( <number>(Permissions.OP) );
    });

    it( "owner change character action", async ()=>
    {
        await initDataBase();

        let user = await makeUser( "ffdd270" );
        let user_op = await makeUser( "Oper");
        let user_not_owner = await makeUser( "MeliMelo");

        await UserController.SetAdmin( user );

        let story = await makeStory( user, "테스트 스토리", "파이널 판타지");
        await makePermission( user_op, story, Permissions.OP );

        let character = await makeCharacter( user, "하루가카", story.id);

        let user_permission = await CharacterController.GetCharacterPermission( character, user );
        let flag1 = await CharacterAction.ChangeMaxHP( character, user_permission, 10 );
        character.save();

        expect( flag1 ).to.equal( true );
        expect( character.max_hp ).to.equal( 10 );


        let user_permission2 = await CharacterController.GetCharacterPermission( character, user_op );
        let flag2 = await CharacterAction.ChangeMaxHP( character, user_permission2, 5 );
        character.save();

        expect( flag2 ).to.equal( true );
        expect( character.max_hp ).to.equal( 5 );


        let user_permission3 = await CharacterController.GetCharacterPermission( character, user_not_owner );
        let flag3 = await CharacterAction.ChangeMaxHP( character, user_permission3, 7 );
        character.save();

        expect( flag3 ).to.equal( false );
        expect( character.max_hp ).to.equal( 5 );
    });
});
