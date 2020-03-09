import express, {Request, Response} from "express";
import {BattleController} from "../controllers/battle";

const router = express.Router();

router.post('/', async function( request: Request, response: Response)
{
    return response.send( BattleController.GetBattlesResponse( ) );
});
