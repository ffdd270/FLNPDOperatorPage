import express, {Request, Response} from "express";
import {CharacterController} from "../controllers/character";
import {BattleController} from "../controllers/battle";
import {Unit} from "../instance/unit";
import {Character} from "../models/character";
import {UnitResponse} from "../util/response";
import {BattleSocket} from "../sockets/battle_socket";

const router = express.Router();

router.post('/', async function( request : Request, response : Response )
{
    let battle_id = request.body.battle_id;
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

    let unit_type = request.body.unit_type;
    let is_enemy = unit_type == "enemy";

    let char_model = <Character>( char );
    let unit = new Unit( char_model,  is_enemy );

    if( is_enemy )
    {
        battle.AddEnemyMember( unit );
    }
    else
    {
        battle.AddPartyMember( unit );
    }

    let unit_response = new UnitResponse( unit );
    await unit_response.SetImage( char_model.sprite_id );
    BattleSocket.BroadcastingAddUnit( unit_response );

    return response.send(unit_response);
});

export default router;