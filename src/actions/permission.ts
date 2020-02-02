import {User} from "../models/user";
import {Story} from "../models/story"
import {Permission, Permissions} from "../models/permission";


export class PermissionAction
{
    static CheckPermission( permission_model : Permission, user_model : User, story_model : Story ) : boolean
    {
        let permission : Permissions = <Permissions>( permission_model.permission);

        if( permission != Permissions.OP )
        {
            return false;
        }

        let permission_user_id = permission_model.user_id;
        let permission_story_id = permission_model.story_id;


        return ( permission_user_id == user_model.id && permission_story_id == story_model.id )
    }
}
