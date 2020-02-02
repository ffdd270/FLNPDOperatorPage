import {Character} from "../models/character";
import {Permissions} from "../models/permission";

export class CharacterAction
{
    static ChangeMaxHP( char_model : Character, user_permissions : Permissions, max_hp : number ) : boolean
    {
        if ( user_permissions != Permissions.OP && user_permissions != Permissions.Owner )
        {
            return false;
        }

        char_model.max_hp = max_hp;
        return true;
    }

}
