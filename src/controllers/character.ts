import {Character} from "../models/character";
import {User} from "../models/user";
import {Permission, Permissions} from "../models/permission";
import {PermissionController} from "./permission";
import {StoryController} from "./story";
import {Story} from "../models/story";


export class CharacterCreateParam
{
    //Char Desc
    name : string;
    age! : number;
    sex! : string;
    //Char Desc

    // STATS
    max_hp! : number;
    max_ap! : number;
    att! : number;
    // STATS

    // DB LINK
    user_id : string;
    story_id : number;
    skill_set_id! : number;
    sprite_id! : number;
    // DB LINK

    constructor( name: string, user_id : string, story_id : number )
    {
        this.name = name;
        this.user_id = user_id;
        this.story_id =story_id;
        this.max_hp = 5;
        this.max_ap = 100;
    }

    MakeObject( id? : number ) : object
    {
        return {
            id: id,
            name: this.name,
            age: this.age,
            sex: this.sex,
            max_hp: this.max_hp,
            max_ap: this.max_ap,
            user_id: this.user_id,
            story_id: this.story_id,
            skill_set_id: this.skill_set_id,
            sprite_id: this.sprite_id,
        }
    }
}


export class CharacterController
{
    static async AddCharacter( user_model : User, char_params : CharacterCreateParam ) : Promise<Character | boolean>
    {
        let name = char_params.name;
        let story_id = char_params.story_id;

        //같은 스토리에서,  동일 이름 캐릭터 중복 불가능,.
        let is_exist = await this.FindCharacterByName( story_id, name );
        if ( is_exist != false )
        {
            return false;
        }

        // On After Check
        let new_character = await new Character( char_params.MakeObject() );
        await new_character.save();

        return new_character;
    }

    static async GetAllCharacter( ) : Promise< Character[] >
    {
        return Character.findAll();
    }

    static async FindAllCharacterByUser( user_model : User ) : Promise< Character[] | boolean >
    {
        let user_id = user_model.id;
        let characters : Character[] = await Character.findAll( { where : { user_id: user_id } } );

        if (characters == null)
        {
            return false;
        }

        return characters;
    }

    static async FindCharacterByName( story_id : number, name : string ) :  Promise<Character|boolean>
    {
        let character : Character | null = await Character.findOne( { where : { name: name, story_id: story_id } } );

        if( character == null )
        {
            return false;
        }

        return character;
    }

    static async FindCharactersByStoryId( story_id : number ) : Promise<Character[]|boolean>
    {
        let characters_array : Character[] = await Character.findAll( { where: {  story_id: story_id }});
        if( characters_array == null )
        {
            return false;
        }

        return characters_array;
    }

    static async FindCharacterById( id : number ) : Promise<Character | boolean>
    {
        let character : Character | null = await Character.findOne( { where: { id: id } }  );

        if ( character == null )
        {
            return false;
        }

        return character;
    }

    static async DeleteCharacter( id : number ) : Promise<boolean>
    {
        let count = await Character.destroy({where: { id: id } } );

        if( count == 0 )
        {
            return false;
        }
        return true;
    }



    static async GetCharacterPermission( char_model : Character, user_model : User ) : Promise<Permissions>
    {
        let user_id = char_model.user_id;
        if( user_id == user_model.id )
        {
            return Permissions.Owner;
        }

        let story =  await StoryController.FindStoryById( char_model.story_id );
        if ( story == false )
        {
            return Permissions.Player;
        }

        let story_model = <Story>( story );
        let permissions = await PermissionController.FindPermission( user_model, story_model );

        if ( permissions == false )
        {
            return Permissions.Player;
        }

        return (<Permission>(permissions)).permission;
    }
}
