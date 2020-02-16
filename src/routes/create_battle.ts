import express, {Request, Response} from "express";
import {BattleController} from "../controllers/battle";

const router = express.Router();

router.post('/', async function( request : Request, response: Response )
{
    let battle_id = request.body.battle_id;

    if ( battle_id == undefined )
    {
        return response.status( 400 ).send("BAD REQUEST! BATTLE ID WAS NULL.");
    }

    BattleController.CreateBattle( battle_id );
    return response.send(battle_id);
});

export default router;