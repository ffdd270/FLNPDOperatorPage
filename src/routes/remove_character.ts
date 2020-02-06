import express, {NextFunction, Request, Response} from 'express';

import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Character} from "../models/character";


const router = express.Router();


router.delete('/:id', async function( request : Request, response : Response  )
{
    let id = +request.params.id;

    await CharacterController.DeleteCharacter( id );

    response.send( "OK" );
});


export default router;
