import {User} from "../models/user";

// 각
export class UserAction
{
    static ChangeUserName( user_model : User, name : string ) : boolean
    {
        if( name == "" )
        {
            return false;
        }

        user_model.name = name;

        return true
    }
}
