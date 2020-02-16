import express from "express";
import {BattleController} from "../controllers/battle";
import {UnitResponse} from "../util/response";
const router = express.Router();

router.get('/:battle_id', async function( request, response )
{
    let battle_id = request.params.battle_id;

    let battle = BattleController.GetBattle( battle_id );
    if( battle == undefined )
    {
        return response.status(404).send("Battle Not Found.");
    }

    let units = battle.GetAllPartyMember();

    let responses : UnitResponse[] = [];

    for ( let unit of units )
    {
        let unit_response = new UnitResponse( unit );
        await unit_response.SetImage( unit.sprite_unique_id );

        responses.push( unit_response );
    }

    response.send( responses );
});

export default router;