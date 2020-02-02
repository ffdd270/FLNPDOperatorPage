import {Sprite} from "../models/sprite"

export class SpriteController
{
    static async AddSprite( file_path : string, filename : string ) : Promise< Sprite | boolean >
    {
        let sprite_exist = await this.FindSpriteByFileName( filename );

        if ( sprite_exist != false )
        {
            return sprite_exist;
        }
        
        let id = await Sprite.count();
        let new_sprite = await new Sprite( { id: id, sprite_path: file_path, sprite_name: filename } );
        new_sprite.save();

        return new_sprite;
    }

    static async FindSpriteByFileName( filename : string ) : Promise< Sprite | boolean >
    {
        let sprite = await Sprite.findOne( { where: { sprite_name: filename } } );

        if ( sprite == null )
        {
            return false;
        }

        return sprite;
    }

    static async FindSpriteById( id : number ) : Promise< Sprite | boolean >
    {
        let sprite = await Sprite.findOne( { where: { id: id } } );

        if ( sprite == null )
        {
            return false;
        }

        return sprite;
    }
}
