// 타입스크립트 트레이스 백 지원.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

// API Server Import.
import express from 'express';
import path from 'path';

import indexRouter from './routes/index'

import getCharactersRouter from './routes/get_characters'
import getCharacterRouter from './routes/get_character'
import getPartyUnits from './routes/get_party_units'
import getAllUnits from './routes/get_all_units'
import getBattles from './routes/get_battles'

import createBattleRouter from './routes/create_battle'
import createCharacterRouter from './routes/create_character'
import createAccountRouter from './routes/create_account'
import createPartyUnit from './routes/create_party_unit'

import removeCharacterRouter from './routes/remove_character'

import {User} from './models/user';
import {Character} from './models/character';
import {Story} from "./models/story";
import {Sprite} from "./models/sprite";
import {Database} from "./database";
import {UserController} from "./controllers/user";
import {StoryController} from "./controllers/story";
import {CharacterController} from "./controllers/character";

async function makeUser( id : string ) : Promise< User >
{
    let user : User | boolean = await UserController.AddUser(id, "hash", "HaruGakka");
    return <User>(user);
}

async function makeStory(user_model : User, name : string, desc : string ) : Promise< Story >
{
    let story: Story | boolean = await StoryController.AddStory(user_model, name, desc);

    return <Story>(story);
}

(async () => {
    await Database.AddModels([User, Character, Story, Sprite]);
    let user = await makeUser("test_account");
    await UserController.SetAdmin( user );

    await makeStory(user, 'test_story', '이게 테스트입니다. \n 집에 가고 싶어요- \n 사장님 여기 짜장면 4그릇 추가요- 이ㅅ라샤이마세[')
})();

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('port', 5000);

app.use(express.urlencoded());

app.use('/image', express.static('./uploads'));
app.use('/api/index', indexRouter);

app.use('/api/create_account', createAccountRouter);
app.use('/api/create_character', createCharacterRouter);
app.use('/api/create_battle', createBattleRouter);
app.use('/api/create_party_unit', createPartyUnit);

app.use('/api/get_characters', getCharactersRouter);
app.use('/api/get_character', getCharacterRouter);
app.use('/api/get_battles', getBattles);
app.use('/api/get_party_units', getPartyUnits);
app.use('/api/get_all_units', getAllUnits);

app.use('/api/remove_character', removeCharacterRouter);

// API SERVER INIT END.
export default app;
