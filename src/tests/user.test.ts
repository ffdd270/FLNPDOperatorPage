import {Sequelize} from "sequelize-typescript";
import {User} from "../models/user";
import {UserController} from "../controller/user";
import {UserAction} from "../action/user";

import crypto from "crypto";

import {expect} from "chai";

describe( 'User Test', ()=>
{
    const sequelize = new Sequelize( {
        database: "test user db",
        dialect: 'sqlite',
        storage: ":memory:"
    });

    before( async() =>
    {
    });

    async function init_database()
    {
        sequelize.drop();
        sequelize.addModels([User]);
        await sequelize.sync();
    }

    it("create user.", async()=>
    {
        await init_database();

        let password : string = 'test_password';
        let password_hash : string = crypto.createHash('sha512').update(password).digest('hex');

        let user : User | boolean = await UserController.AddUser("ffdd270", password_hash, "HaruGakka" );
        expect(user).not.equal( false );

        let model_user = <User>(user);

        expect(model_user.id).to.equal("ffdd270");
        expect(model_user.password).to.equal(password_hash);
        expect(model_user.name).to.equal("HaruGakka");
    });

    it( "create already user.", async () =>
    {
        await init_database();

        let user : User | boolean = await UserController.AddUser("ffdd270", 'password_hash', "HaruGakka" );
        expect(user).not.equal( false );

        let user_same : User | boolean = await UserController.AddUser("ffdd270", 'password_hash', "HaruGakka" );
        expect(user_same).to.equal( false );
    });

    it( 'create two user, and find user. ', async () =>
    {
        await init_database();

        let user1 : User | boolean = await UserController.AddUser("HaruGakka", 'pwd', 'Replace');
        expect(user1).not.equal( false );

        let user2 : User | boolean = await UserController.AddUser("nhy3795", 'pwd', 'Space');
        expect(user2).not.equal( false );

        let find_user_1 : User | boolean  = await UserController.FindUser("nhy3795");
        expect(find_user_1).not.equal( false );

        let model_user_1 = <User>( find_user_1 );
        expect(model_user_1.name).to.equal( 'Space' );
    });

    it('create user, and change name.', async () =>
    {
        await init_database();
        await UserController.AddUser("HaruGakka", 'pwd', 'Replace');

        let find_user : User | boolean = await UserController.FindUser("HaruGakka");
        expect(find_user).not.equal(false);

        let user_model = <User>(find_user);

        UserAction.ChangeUserName( user_model, "Not Name" );
        await user_model.save();

        expect(user_model.name).to.equal("Not Name");
    });
});
