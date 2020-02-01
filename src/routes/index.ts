import express, {NextFunction, Request, Response} from 'express';
import {ModelExample} from "../models/sqlite-model-example";

// 클래스, 네임 스페이스에서 가져올  함수들.

const router = express.Router();

router.get( '/', async function( request : Request, response : Response, next : NextFunction )
{
    let model_example = await ModelExample.create( { id:2, name:'HaruGakka' } );
    model_example.name = 'HaruGakka';
    await model_example.save();

    let name =  model_example.name;
    response.render('index', { title: name });
});

export = router
