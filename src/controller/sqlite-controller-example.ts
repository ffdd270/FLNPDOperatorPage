// let's use sqlite3 from https://github.com/mapbox/node-sqlite3
import {Sequelize} from 'sequelize-typescript';
import {ModelExample} from "../models/sqlite-model-example";

export const sequelize =  new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    storage: ':memory:',
    models: [ModelExample]
});
