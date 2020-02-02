import {Sequelize} from "sequelize-typescript";
import {Database} from "../database";

import {Permission} from "../models/permission";
import {Character} from "../models/character";
import {User} from "../models/user";


describe( 'Permission Test', ()=>
{
    async function initDataBase( )
    {
        await Database.ClearDatabase();
        await Database.AddModels( [Character, User, Permission] );
    }


    it("set permission", async ()=>
    {
        await initDataBase();
    });



});
