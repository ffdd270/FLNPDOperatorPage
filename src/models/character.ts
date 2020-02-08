import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';
import {SkillSet} from "./skill_set";
import {User} from "./user";
import {Story} from "./story";
import {Sprite} from "./sprite";

@Table
export class Character extends Model<Character>
{
    @Column( {primaryKey: true, type: DataType.INTEGER, autoIncrement: true} )
    id! : number;

    //Char Desc
    @Column(DataType.TEXT)
    name! : string;

    @Column(DataType.INTEGER)
    age! : number;

    @Column(DataType.TEXT)
    sex! : string;
    //Char Desc

    // STATS
    @Column(DataType.INTEGER)
    max_hp! : number;

    @Column(DataType.INTEGER)
    max_ap! : number;

    @Column(DataType.INTEGER)
    att! : number;

    @Column(DataType.FLOAT)
    att_acc! : number; //정확도
    // STATS

    // DB LINK
    @ForeignKey(() => User)
    @Column(DataType.TEXT)
    user_id! : string;

    @ForeignKey(() => Story)
    @Column(DataType.INTEGER)
    story_id! : number;

    @ForeignKey(() => SkillSet)
    @Column(DataType.INTEGER)
    skill_set_id! : number;

    @ForeignKey( () => Sprite)
    @Column(DataType.INTEGER)
    sprite_id! : number;
    // DB LINK END

    @Column(DataType.DATE)
    create_time! : Date;
}
