import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';
import {User} from "./user";
import {Story} from "./story";

@Table
export class Permission extends Model<Permission>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
    id! : number;

    @ForeignKey( ()=>Story)
    @Column(DataType.INTEGER)
    story_id! : string;

    @ForeignKey(()=>User)
    @Column(DataType.TEXT)
    user_id! : string;

    @Column({ type: DataType.INTEGER, comment: "NULL is Player. 1 IS OP." } )
    permission! : number;
}
