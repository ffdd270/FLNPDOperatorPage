import express from 'express';
import path from 'path';
import indexRouter from './routes/index'
import createAccountRouter from './routes/create_account'

import {User} from './models/user';
import {Character} from './models/character';
import {Database} from "./database";



(async () => {
    await Database.AddModels([User, Character]);
})();

// 타입스크립트 트레이스 백 지원.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('port', 3000);

app.use(express.urlencoded());

app.use('/', indexRouter);
app.use('/create_account', createAccountRouter);

export default app;
