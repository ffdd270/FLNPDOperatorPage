import express, {NextFunction, Request, Response} from 'express';
import multer from 'multer';

import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {Character} from "../models/character";
import {User} from "../models/user";
import {Story} from "../models/story";
import {StoryController} from "../controllers/story";
import {UserController} from "../controllers/user";
import {SpriteController} from "../controllers/sprite";
import {Sprite} from "../models/sprite";


const router = express.Router();
const upload = multer({dest: './uploads'});


router.post('/', upload.single('sprite'), async function( request : Request, response : Response)
{
    let file_filename = request.file == undefined ? '' : request.file.filename;

    let image_path = '/image/' + file_filename;

    if( file_filename == '' )
    {
        image_path = '';
    }

    let name = request.body.name;
    let age = request.body.age;
    let sex = request.body.sex;
    let user_id = request.body.user_id;
    let story_id = request.body.story_id;
    let file_name = request.body.file_name;

    let user = await UserController.FindUser( user_id );
    if ( user == false )
    {
        return response.status(400).send( "BAD REQUEST! NOT HAVE USER!");
    }
    let user_model = <User>( user );

    let story = await StoryController.FindStoryById( story_id );
    if ( story == false )
    {
        return response.status(400).send( "BAD REQUEST! NOT HAVE STORY!");
    }
    // 사전 검사 끝. 생성.

    let story_model = <Story>( story );
    let create_params: CharacterCreateParam = new CharacterCreateParam(name, user_model.id, story_model.id);
    create_params.sex = sex;
    create_params.age = age;
    create_params.name = name;

    if ( image_path != '')
    {
        let sprite = await SpriteController.AddSprite( image_path, file_name );
        let sprite_model = <Sprite>(sprite);

        create_params.sprite_id = sprite_model.id;
    }

    let character: Character | boolean = await CharacterController.AddCharacter(user_model, create_params);
    if ( character == false )
    {
        return response.status(400).send( "BAD REQUEST! NOT HAVE CHARACTER!");
    }

    response.send( character );
});

export default router;

