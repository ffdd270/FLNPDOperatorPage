import express, {Request, Response} from 'express';
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Character} from "../models/character";
import {User} from "../models/user";
import {Story} from "../models/story";
import {StoryController} from "../controllers/story";
import {UserController} from "../controllers/user";
import {expect} from "chai";

const router = express.Router();


class CharacterResponse
{
    id! : number;
    image! : string;
    name! : string;
    age! : number;
    sex! : string;
    max_hp! : number;
    max_ap! : number;
    user_id : string;
    skill_set_id! : string;

    constructor( char_model : Character )
    {
        this.id = char_model.id;
        this.name = char_model.name;
        this.age = char_model.age;
        this.sex = char_model.sex;
        this.max_hp = char_model.max_hp;
        this.max_ap = char_model.max_ap;
        this.user_id = char_model.user_id;
    }

    MakeObject( )
    {
        return {
            id: this.id,
            image: this.image,
            name: this.name,
            age: this.age,
            sex: this.sex,
            max_hp: this.max_hp,
            max_ap: this.max_ap,
            user_id: this.user_id
        }


    }
}

// 테스트 코드. 나중에 지울 것.

async function makeUser( id : string ) : Promise< User >
{
    let user : User | boolean = await UserController.AddUser(id, "hash", "HaruGakka");
    return <User>(user);
}

async function makeStory(user_model : User, name : string, desc : string ) : Promise< Story >
{
    let story: Story | boolean = await StoryController.AddStory(user_model, name, desc);

    return <Story>(story);
}

async function makeCharacter( user_model : User, name : string, story_id : number ) : Promise< Character >
{
    let create_params: CharacterCreateParam = new CharacterCreateParam(name, user_model.id, story_id);
    let character: Character | boolean = await CharacterController.AddCharacter(user_model, create_params);

    return <Character>(character);
}

//테스트 코드. 나중에 지울 것.

router.get('/', async function ( request : Request, response : Response)
{
    let count = await Character.count();

    // 테스트 코드
    if( count == 0 )
    {
        let user : User = await makeUser("test_code" ); // User Add Here
        UserController.SetAdmin( user );

        let story : Story = await makeStory( user, "This Is Story", "Not Story.");

        for( let i = 0; i < 5; i++ )
        {
            await makeCharacter( user, "HaruGakka" + i, story.id );
        }
    }
    // 테스트 코드

    let characters : Character[] = await CharacterController.GetAllCharacter();
    let responses : Object[] = [];


    for( let i = 0; i < characters.length; i++ )
    {
        let char_model = characters[i];

        let response = new CharacterResponse( char_model );
        responses[i] = response.MakeObject();
    }

    response.send( responses );
});

export default router;
