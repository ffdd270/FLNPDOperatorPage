import {Sequelize, Model, ModelCtor} from "sequelize-typescript";
import {Character} from "./models/character";
import {User} from "./models/user";


export class Database
{
    private static sequelize : Sequelize = new Sequelize({
        database: "test character db",
        dialect: 'sqlite',
        storage: ":memory:"
    });

    static async ClearDatabase( )
    {
        this.sequelize.drop();
        await this.sequelize.sync();
    }

    static async AddModels( models : ModelCtor[] )
    {
        this.sequelize.addModels( models );
        await this.sequelize.sync();
    }




}
