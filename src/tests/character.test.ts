import {Sequelize} from "sequelize-typescript";
import {Character} from "../models/character";
import {CharacterController, CharacterCreateParam} from "../controller/character";
import {Database} from "../database";

import {User} from "../models/user";
import {UserController} from "../controller/user";
import {expect} from "chai";
import beginningOfLine = Mocha.reporters.Base.cursor.beginningOfLine;

describe( 'Character Test', ()=>
{
    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User] );
    }

    async function makeUser( id : string ) : Promise< User >
    {
        let user : User | boolean = await UserController.AddUser(id, "hash", "HaruGakka");
        expect(user).not.equal( false );

        return <User>(user);
    }

    async function makeCharacter( user_model : User, name : string, story_id : number ) : Promise< Character >
    {
        const count = await Character.count();
        let create_params : CharacterCreateParam = new CharacterCreateParam( name, user_model.id, story_id );
        let character : Character | boolean = await CharacterController.AddCharacter( user_model, create_params );

        expect(character).not.equal( false );

        let character_model = <Character>( character );
        expect(character_model.user_id).to.equal(user_model.id);
        expect(character_model.id).to.equal( count );
        expect(character_model.name).to.equal(name);

        return character_model;
    }

    it(" create character.", async ()=>
    {
        await initDataBase();
        let user_model = await makeUser( "ffdd270" );
        let character_model =  await makeCharacter( user_model, "키리사키 키리코", 1 );

        console.log(character_model);
    });

    it( "create characters.", async ()=>
    {
        await initDataBase();
        let user_model = await makeUser( "ffdd270");

        await makeCharacter( user_model, "키리사키 키리코", 1 );
        await makeCharacter( user_model, "키리사키 키사키", 1 );
    });

    it( "create exist character.", async ()=>
    {
        await initDataBase();
        let user_model = await makeUser("HaruGak");

        await makeCharacter( user_model, "키리키리", 1 );
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
        let user_model1 = await makeUser( "HaruGakka");
        let user_model2 = await makeUser( "ffdd270");

        await makeCharacter( user_model1, "키리사키 키리코", 1 );
        await makeCharacter( user_model1, "키리사키 씨", 1 );
        await makeCharacter( user_model1, "키리사키 키리코(보스)", 1 );

        await makeCharacter( user_model2, "하루가카", 1 );
        await makeCharacter( user_model2, "하루가카 ( 보스 ) ", 1 );

        let characters = await CharacterController.FindAllCharacterByUser( user_model1 );
        expect(characters).not.equal( false );

        let model_characters : Character[] = <Character[]>(characters);
        expect(model_characters.length).to.equal( 3 );
    });
});
