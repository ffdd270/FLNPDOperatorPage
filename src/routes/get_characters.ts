import express, {NextFunction, Request, Response} from 'express';
import {CharacterController} from "../controllers/character";
import {Character} from "../models/character";

const router = express.Router();


class GetCharactersResponse
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
        this.id = char_model.id;
        this.id = char_model.id;
        this.id = char_model.id;
        this.id = char_model.id;
        this.id = char_model.id;
    }

    MakeObject( )
    {
        return {
            id: this.id,
            image: this.image,
        }


    }
}



router.get('/', async function ( request : Request, response : Response)
{





    response.send(
        [
            {

            }
        ]
    )
});
