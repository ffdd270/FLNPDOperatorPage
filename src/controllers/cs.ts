import {CS} from '../models/cs';
import {CS_TYPE} from "../util/battle_util";

export class CSController
{
    static async AddCS( name : string, cs_type : CS_TYPE ) : Promise< CS | boolean >
    {
        let cs_exist = await this.FindCS( name );

        if( cs_exist != false )
        {
            return false;
        }

        let cs = await new CS( { id: name, cs_type: cs_type }  );
        await cs.save();

        return cs;
    }


    static async FindCS( name : string ) : Promise<CS | boolean>
    {
        let cs = await CS.findOne( { where: { id: name } } );

        if ( cs == null )
        {
            return false;
        }

        return cs;
    }
}