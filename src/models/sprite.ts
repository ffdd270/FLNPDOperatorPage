import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';

@Table
export class Sprite extends Model<Sprite>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
    id! : number;

    @Column( DataType.TEXT )
    sprite_name! : string;

    @Column( DataType.TEXT )
    sprite_path!: string;
}
