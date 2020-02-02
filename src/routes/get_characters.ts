import express, {Request, Response} from 'express';
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Character} from "../models/character";
import {User} from "../models/user";
import {Story} from "../models/story";
import {StoryController} from "../controllers/story";
import {UserController} from "../controllers/user";
import {expect} from "chai";
import {SpriteController} from "../controllers/sprite";
import {Sprite} from "../models/sprite";

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

    async SetImage( char_model : Character )
    {
        let sprite = await SpriteController.FindSpriteById( char_model.sprite_id );

        if ( sprite == false )
        {
            return false;
        }

        let sprite_model = <Sprite>( sprite );
        this.image = sprite_model.sprite_path;
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

router.get('/', async function ( request : Request, response : Response)
{
    let characters : Character[] = await CharacterController.GetAllCharacter();
    let responses : Object[] = [];


    for( let i = 0; i < characters.length; i++ )
    {
        let char_model = characters[i];

        let response = new CharacterResponse( char_model );
        await response.SetImage( char_model );
        
        responses[i] = response.MakeObject();
    }

    response.send( responses );
});

export default router;
