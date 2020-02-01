import express from 'express';
import path from 'path';
import indexRouter from './routes/index'
import {sequelize} from './controller/sqlite-controller-example'
import {ModelExample} from "./models/sqlite-model-example";
import {QueryInterface} from "sequelize";

(async () => {
    await sequelize.sync({force: true});
})();

console.log("INITED!");

// 타입스크립트 트레이스 백 지원.
require('source-map-support').install();
process.on('unhandledRejection', console.log);

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.set('port', 3000);

app.use('/', indexRouter);

export default app;
