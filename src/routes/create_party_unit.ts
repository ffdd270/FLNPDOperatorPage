import express from "express";
import {CharacterController} from "../controllers/character";
import {BattleController} from "../controllers/battle";
import {Unit} from "../instance/unit";
import {Character} from "../models/character";
import {UnitResponse} from "../util/response";

const router = express.Router();

router.post('/:battle_id', async function( request, response )
{
    let battle_id = request.params.battle_id;
    let battle = BattleController.GetBattle( battle_id );

    let char_id = +request.body.char_id;

    let char = await CharacterController.FindCharacterById( char_id );

    if ( battle == undefined )
    {
        return response.status(400).send( "BAD REQUEST! NOT CREATE BATTLE!");
    }

    if ( char == false )
    {
        return response.status(400).send( "BAD REQUEST! NOT HAVE CHARACTER!");
    }
    let char_model = <Character>( char );

    let unit = new Unit( char_model, false );
    battle.AddPartyMember( unit );

    let unit_response = new UnitResponse( unit );
    await unit_response.SetImage( char_model.sprite_id );

    response.send(unit_response);
});

export default router;