import express, {NextFunction, Request, Response} from 'express';
import {UserController} from "../controller/user";
import {User} from "../models/user";

// 클래스, 네임 스페이스에서 가져올  함수들.

const router = express.Router();

router.get( '/', async function( request : Request, response : Response, next : NextFunction )
{
    let id = 'ffdd270';
    let user_exist = await UserController.FindUser(id) ;

    let title : string | null;

    if( user_exist == false)
    {
        title = null;
    }
    else
    {
        let user : User  = <User>(user_exist);
        title = user.name;
    }

    response.render('index', { title: title });
});

export = router
