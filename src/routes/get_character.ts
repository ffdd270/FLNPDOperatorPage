import express from "express";

import {Character} from "../models/character";
import {CharacterResponse} from "../util/response";
import {CharacterController} from "../controllers/character";

const router = express.Router();

router.get('/:id', async  function ( request, response )
{
    console.log( " id! !! !!!!!!!!!!!!! ")
    let id : string = request.params.id;

    let char = await CharacterController.FindCharacterById( parseInt( id ) );
    let char_response = new CharacterResponse( <Character>(char) );
    await char_response.SetImage( <Character>(char) );


    response.send( char_response.MakeObject() );
});

export default router;