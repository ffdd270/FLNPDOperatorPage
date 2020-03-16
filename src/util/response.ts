import {Character} from "../models/character";
import {SpriteController} from "../controllers/sprite";
import {Sprite} from "../models/sprite";
import {Unit} from "../instance/unit";
import {CSInstance} from "../instance/cs";
import {Dice} from "../instance/dice";
import {Battle} from "../instance/battle";

async function AsyncSetImage( sprite_id : number )
{
    let sprite = await SpriteController.FindSpriteById( sprite_id );

    if ( sprite == false )
    {
        return false;
    }

    let sprite_model = <Sprite>( sprite );
    return sprite_model.sprite_path;
}

export interface ResponseResult
{
    msg : string;
    command : string;
}

export interface Response
{
    MakeObject() : ResponseResult;
}


export class ErrorResponse implements Response
{
    readonly command : string;
    readonly error_string : string;

    constructor( command : string, error_string : string )
    {
        this.command = command;
        this.error_string = error_string;
    }

    MakeObject()
    {
        return {
            msg: "ON COMMAND PARSING ERROR. CHECK ERROR STRING.",
            command: this.command,
            error_string: this.error_string,
        }
    }
}

export class UnknownResponse implements Response
{
    readonly command : string;

    constructor( command : string )
    {
        this.command = command
    }

    MakeObject(): ResponseResult
    {
        return {
            msg: "FAILED. Wrong REQ.",
            command: this.command
        }
    }
}

export class TurnResponse implements Response
{
    readonly unit_uid : number;

    constructor(  unit : Unit )
    {
        this.unit_uid = unit.unit_unique_id;
    }

    MakeObject()
    {
        return{
            msg : "OK",
            command : "turn",
            turn_unit_uid : this.unit_uid
        };
    }

}

export class DiceResponse implements Response
{
    readonly max_number : number;
    readonly result_number : number;

    constructor( dice : Dice )
    {
        this.max_number = dice.max_number;
        this.result_number = dice.result_number;
    }

    MakeObject()
    {
        return {
            msg: "OK",
            command: "dice",
            max_number: this.max_number,
            result_number: this.result_number
        };
    }
}

export class CharacterResponse implements Response
{
    id! : number;
    image! : string;
    name! : string;
    age! : number;
    sex! : string;
    max_hp! : number;
    max_ap! : number;
    user_id : string;
    skill_set_id! : number;

    constructor( char_model : Character )
    {
        this.id = char_model.id;
        this.name = char_model.name;
        this.age = char_model.age;
        this.sex = char_model.sex;
        this.max_hp = char_model.max_hp;
        this.max_ap = char_model.max_ap;
        this.user_id = char_model.user_id;
        this.skill_set_id = char_model.skill_set_id;
    }

    async SetImage( char_model : Character )
    {
        let image = await AsyncSetImage( char_model.sprite_id );

        if ( image == false )
        {
            return false;
        }

        this.image = <string>( image );
    }

    MakeObject( )
    {
        return {
            command: "character",
            msg: "OK",

            id: this.id,
            image: this.image,
            name: this.name,
            age: this.age,
            sex: this.sex,
            max_hp: this.max_hp,
            max_ap: this.max_ap,
            user_id: this.user_id,
            skill_set_id: this.skill_set_id,
        }
    }
}

export class BattleResponse implements  Response
{
    id : string;

    constructor( battle : Battle )
    {
        this.id = battle.id;
    }

    MakeObject()
    {
        return {
            command: "battle list",
            msg: "OK",
            id: this.id,
        };
    }

}

export class UnitResponse implements Response
{
    uid : number;
    char_id :number;
    image! : string;
    name : string;
    is_enemy : boolean;
    hp : number;
    ap : number;

    constructor( unit : Unit )
    {
        this.uid = unit.unit_unique_id;
        this.char_id = unit.db_unique_id;
        this.name = unit.name;
        this.hp = unit.GetHp();
        this.ap = unit.GetAp();
        this.is_enemy = unit.is_enemy;
    }

    async SetImage( sprite_id : number )
    {
        let image = await AsyncSetImage( sprite_id );

        if ( image == false )
        {
            return false;
        }

        this.image = <string>( image );
    }

    MakeObject()
    {
        return {
            command: "unit",
            msg: "OK",
            id: this.uid,
            char_id: this.char_id,
            image: this.image,
            name: this.name,
            hp: this.hp,
            ap: this.ap,
            is_enemy: this.is_enemy
        }
    }
}
