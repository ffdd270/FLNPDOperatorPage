import {User} from "../models/user";
import {Story} from "../models/story";
import {Permission} from "../models/permission";

export enum Permissions
{
    Player = 0,
    OP,
}

export class PermissionController
{

    static async AddPermission( user_model : User,  story_model : Story, permissions : Permissions ) : Promise<Permission|boolean>
    {
        let permission_exist = await this.FindPermission( user_model, story_model );

        if( permission_exist != false )
        {
            return false;
        }

        let user_id = user_model.id;
        let story_id = story_model.id;
        let permission : number = permissions;

        let id = await Permission.count();
        let permission_model = await new Permission( { id: id, user_id: user_id, story_id: story_id, permission: permission } );
        await permission_model.save();

        return permission_model;
    }


    static async FindPermission( user_model : User, story_model : Story ) : Promise<Permission|boolean>
    {
        let permission : Permission | null = await Permission.findOne( { where: { user_id: user_model.id, story_id : story_model.id  }} );

        if ( permission == null )
        {
            return false;
        }

        return permission;
    }
}
