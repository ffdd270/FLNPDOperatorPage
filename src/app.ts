import express from 'express';
import path from 'path';
import indexRouter from './routes/index'
import createAccountRouter from './routes/create_account'
import getCharactersRouter from './routes/get_characters'

import {User} from './models/user';
import {Character} from './models/character';
import {Story} from "./models/story";
import {Database} from "./database";
import {UserController} from "./controllers/user";

async function makeUser( id : string ) : Promise< User >
{
    let user : User | boolean = await UserController.AddUser(id, "hash", "HaruGakka");
    return <User>(user);
}

(async () => {
    await Database.AddModels([User, Character, Story]);
    await makeUser("test_account");
})();

// 타입스크립트 트레이스 백 지원.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('port', 5000);

app.use(express.urlencoded());

app.use('/api/index', indexRouter);
app.use('/api/create_account', createAccountRouter);
app.use('/api/get_characters', getCharactersRouter);

export default app;
