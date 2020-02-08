import {User} from "../models/user";
import {Character} from "../models/character";
import {Story} from "../models/story";
import {Permission, Permissions} from "../models/permission";

import {UserController} from "../controllers/user";
import {CharacterController, CharacterCreateParam} from "../controllers/character";
import {PermissionController} from "../controllers/permission";
import {StoryController} from "../controllers/story";

import {expect} from "chai";

export namespace TestHelper
{
    export async function makeUser( id : string ) : Promise< User >
    {
        let user : User | boolean = await UserController.AddUser(id, "hash", "HaruGakka");
        expect(user).not.equal( false );

        return <User>(user);
    }

    export async function makeCharacter( user_model : User, name : string, story_id : number ) : Promise< Character >
    {
        const count = await Character.count() + 1;
        let create_params : CharacterCreateParam = new CharacterCreateParam( name, user_model.id, story_id );
        let character : Character | boolean = await CharacterController.AddCharacter( user_model, create_params );

        expect(character).not.equal( false );

        let character_model = <Character>( character );

        expect(character_model.user_id).to.equal(user_model.id);
        expect(character_model.id).to.equal( count );
        expect(character_model.name).to.equal(name);

        return character_model;
    }

    export async function makeStory(user_model : User, name : string, desc : string ) : Promise< Story >
    {
        const count = await Story.count();
        let story  : Story | boolean = await StoryController.AddStory(user_model, name, desc);

        expect(story).not.equal( false );

        let story_model = <Story>( story );

        expect(story_model.name).to.equal(name);
        expect(story_model.desc).to.equal(desc);
        expect(story_model.id).to.equal(count);

        return story_model;
    }

    export async function makePermission( user_model : User, story_model : Story, permissions : Permissions  ) : Promise< Permission >
    {
        const count = await Permission.count();
        let permission  : Permission | boolean = await PermissionController.AddPermission(user_model, story_model, permissions) ;

        expect(permission).not.equal( false );

        let permission_model = <Permission>( permission );

        expect(permission_model.user_id).to.equal(user_model.id);
        expect(permission_model.id).to.equal( count );
        expect(permission_model.permission).to.equal(<number>( permissions ));

        return permission_model;
    }
}
