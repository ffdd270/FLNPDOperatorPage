import {Sequelize} from "sequelize-typescript";
import {ModelExample} from "../models/sqlite-model-example";
import {expect} from "chai";

describe('How To Use Seq?', ()=>
{
    const sequelize = new Sequelize({
        database: "test db",
        dialect: "sqlite",
        storage: ":memory:",
    });

    before(async () =>
    {
        await sequelize.sync();
    });

    it('add model, and insert. ', async () => {

        console.log("SEQ SYNC!");

        sequelize.addModels([ModelExample]) ;
        await sequelize.sync();

        console.log("AddModels!");

        let model_example = await new ModelExample( { name: 'HaruGakka', id: 3, age: 21 } );

        console.log( "%s? %d? %d?", model_example.name, model_example.id, model_example.age );

        expect(model_example.name).to.equal('HaruGakka');
        expect(model_example.id).to.equal(3);
        expect(model_example.age).to.equal(21);
    });


});
