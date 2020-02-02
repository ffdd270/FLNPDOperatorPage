import {Sequelize} from "sequelize-typescript";
import {Character} from "../models/character";
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Database} from "../database";

import {User} from "../models/user";
import {UserController} from "../controllers/user";
import {expect} from "chai";
import {TestHelper} from "./test_helper.test";

describe( 'Character Test', ()=>
{
    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User] );
    }

    it(" create character.", async ()=>
    {
        await initDataBase();
        let user_model = await TestHelper.makeUser( "ffdd270" );
        let character_model =  await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );

        console.log(character_model);
    });

    it( "create characters.", async ()=>
    {
        await initDataBase();
        let user_model = await TestHelper.makeUser( "ffdd270");

        await TestHelper.makeCharacter( user_model, "키리사키 키리코", 1 );
        await TestHelper.makeCharacter( user_model, "키리사키 키사키", 1 );
    });

    it( "create exist character.", async ()=>
    {
        await initDataBase();
        let user_model = await TestHelper.makeUser("HaruGak");

        await TestHelper.makeCharacter( user_model, "키리키리", 1 );
        let create_params : CharacterCreateParam = new CharacterCreateParam( "키리키리", user_model.id, 1 );

        let exist_character : Character | boolean = await CharacterController.AddCharacter( user_model, create_params );
        expect(exist_character).to.equal(false);

        let create_param2 = new CharacterCreateParam( "키리키리", user_model.id, 2 );
        let not_exist_character : Character | boolean = await CharacterController.AddCharacter( user_model, create_param2 );
        expect(not_exist_character).not.equal( false );
    });

    it( "get all user characters.", async() =>
    {
        await initDataBase();
        let user_model1 = await TestHelper.makeUser( "HaruGakka");
        let user_model2 = await TestHelper.makeUser( "ffdd270");

        await TestHelper.makeCharacter( user_model1, "키리사키 키리코", 1 );
        await TestHelper.makeCharacter( user_model1, "키리사키 씨", 1 );
        await TestHelper.makeCharacter( user_model1, "키리사키 키리코(보스)", 1 );

        await TestHelper.makeCharacter( user_model2, "하루가카", 1 );
        await TestHelper.makeCharacter( user_model2, "하루가카 ( 보스 ) ", 1 );

        let characters = await CharacterController.FindAllCharacterByUser( user_model1 );
        expect(characters).not.equal( false );

        let model_characters : Character[] = <Character[]>(characters);
        expect(model_characters.length).to.equal( 3 );
    });
});
