import express, {Request, Response} from "express";
import {BattleController} from "../controllers/battle";

const router = express.Router();

router.get('/', async function( request: Request, response: Response)
{
     response.send( BattleController.GetBattlesResponse( ) );
});


export default router;