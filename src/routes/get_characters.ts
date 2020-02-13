import express, {Request, Response} from 'express';
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Character} from "../models/character";
import {CharacterResponse} from "../util/response";

const router = express.Router();


router.get('/', async function ( request : Request, response : Response )
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
