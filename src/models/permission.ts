import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';

import {User} from "./user";
import {Story} from "./story";


export enum Permissions
{
    Player = 0,
    OP,
    Owner
}


@Table
export class Permission extends Model<Permission>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
    id! : number;

    @ForeignKey( ()=>Story)
    @Column(DataType.INTEGER)
    story_id! : number;

    @ForeignKey(()=>User)
    @Column(DataType.TEXT)
    user_id! : string;

    @Column({ type: DataType.INTEGER, comment: "NULL is Player. 1 IS OP." } )
    permission! : number;
}
