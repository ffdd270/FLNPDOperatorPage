import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';
import {User} from "./user";
import {Story} from "./story";

@Table
export class Character extends Model<Character>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
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
    // STATS

    // DB LINK
    @ForeignKey(() => User)
    @Column(DataType.TEXT)
    user_id! : string;

    @ForeignKey(() => Story)
    @Column(DataType.INTEGER)
    story_id! : number;

    //@ForeignKey(() => )
    @Column(DataType.INTEGER)
    skill_set_id! : number;

    @Column(DataType.INTEGER)
    sprite_id! : number;
    // DB LINK

    @Column(DataType.DATE)
    create_time! : Date;
}
