import {Character} from "../models/character";
import {SpriteController} from "../controllers/sprite";
import {Sprite} from "../models/sprite";
import {Unit} from "../instance/unit";

async function SetImage( sprite_id : number )
{
    let sprite = await SpriteController.FindSpriteById( sprite_id );

    if ( sprite == false )
    {
        return false;
    }

    let sprite_model = <Sprite>( sprite );
    return sprite_model.sprite_path;
}

export class CharacterResponse
{
    id! : number;
    image! : string;
    name! : string;
    age! : number;
    sex! : string;
    max_hp! : number;
    max_ap! : number;
    user_id : string;
    skill_set_id! : string;

    constructor( char_model : Character )
    {
        this.id = char_model.id;
        this.name = char_model.name;
        this.age = char_model.age;
        this.sex = char_model.sex;
        this.max_hp = char_model.max_hp;
        this.max_ap = char_model.max_ap;
        this.user_id = char_model.user_id;
    }

    async SetImage( char_model : Character )
    {
        let image = await SetImage( char_model.sprite_id );

        if ( image == false )
        {
            return false;
        }

        this.image = <string>( image );
    }

    MakeObject( )
    {
        return {
            id: this.id,
            image: this.image,
            name: this.name,
            age: this.age,
            sex: this.sex,
            max_hp: this.max_hp,
            max_ap: this.max_ap,
            user_id: this.user_id
        }
    }
}

export class UnitResponse
{
    uid : number;
    char_id :number;
    image! : string;
    name : string;
    hp : number;
    ap : number;

    constructor( unit : Unit )
    {
        this.uid = unit.unit_unique_id;
        this.char_id = unit.db_unique_id;
        this.name = unit.name;
        this.hp = unit.GetHp();
        this.ap = unit.GetAp();
    }

    async SetImage( sprite_id : number )
    {
        let image = await SetImage( sprite_id );

        if ( image == false )
        {
            return false;
        }

        this.image = <string>( image );
    }

    MakeObject()
    {
        return {
            id: this.uid,
            char_id: this.char_id,
            image: this.image,
            name: this.name,
            hp: this.hp,
            ap: this.ap,
        }
    }
}