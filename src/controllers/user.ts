import {User} from "../models/user";

export class UserController
{
    static async AddUser( id : string, password : string, user_name : string ) : Promise<User | boolean>
    {
        let user_exist =  await User.findOne( { where: { id: id } } );
        if ( user_exist != null ) { return false; }

        let user = await new User({id: id, password: password, name: user_name });
        await user.save();

        return user;
    }

    static async FindUser( id : string ) : Promise<User | boolean>
    {
        let user_exist =  await User.findOne( { where: { id: id } } );
        if (user_exist == null)
        {
            return false;
        }

        return user_exist;
    }

    static async SetAdmin( user_model : User )
    {
        user_model.permission = "ADMIN";
        await user_model.save();
    }

}
