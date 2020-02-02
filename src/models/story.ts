import {Table, Column, Model, HasMany, DataType, ForeignKey} from 'sequelize-typescript';

@Table
export class Story extends Model<Story>
{
    @Column( {primaryKey: true, type: DataType.INTEGER} )
    id! : number;

    @Column( DataType.TEXT )
    name! : string;

    @Column( DataType.TEXT )
    desc! : string;

}
