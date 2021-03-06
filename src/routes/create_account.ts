import express, {NextFunction, Request, Response} from 'express';
import {CharacterController} from "../controllers/character";

const router = express.Router();

router.get( '/', async function( request : Request, response : Response, next : NextFunction )
{
    response.render('create_account', {title: "계정을 만들어주세요."} );
});


router.post('/', async function( request: Request, response: Response )
{
    let id = request.body.id;
    let password = request.body.password;

    response.send("OK.");
});

export = router
